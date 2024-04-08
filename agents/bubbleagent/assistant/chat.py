import asyncio
import inspect
import json
import time
import traceback
from openai import OpenAI
import websockets
from bubbleagent.config import app_settings
from bubbleagent.agent import tools
from bubbleagent.agent import tools_map
from bubbleagent.assistant.memory import ChatMemory
from loguru import logger
from openai.types.chat import ChatCompletionMessage, ChatCompletionMessageToolCall
from bubbleagent.utils.fetch_data import fetch_suggestion_query
from typing import Generator
from enum import Enum

from bubbleagent.utils.format import agent_return_format


class AgentName(Enum):
    News = "news_agent"
    Chat = "chat_agent"
    Swap = "swap_agent"
    Token = "token_agent"
    Price = "price_agent"
    Wallet = "wallet_agent"
    TVL = "DexAgent"


class AgentFlow(Enum):
    CALL = "agent_call"
    TOOL_RESPOND = "agent_respond"
    # TOOL_RESULT = "agent_respond"
    TOOL = "agent_tool_call"
    RESPOND = "agent_answer"
    SUGGESTION = "suggestion_query"


openai = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    base_url=app_settings.OPENAI_URL,
    # base_url="https://api.expansion.chat/v1",
    api_key=app_settings.OPENAI_KEY,
)


async def send_message(
    message: str, types: str, websocket, status: str = "successful", **kwargs
):
    no_need_to_parse = [
        AgentFlow.RESPOND.value,
        AgentFlow.SUGGESTION.value,
        AgentFlow.CALL.value,
    ]
    if isinstance(message, str) and types not in no_need_to_parse:
        message = json.loads(message)
    if isinstance(message, list) and types not in no_need_to_parse:
        _ = [await send_message(m, types, websocket, status, **kwargs) for m in message]
        return

    if types == AgentFlow.TOOL_RESPOND.value:
        agent_name = message.get("agent_name")
        status = message.get("status")
        data = message.get("data")
        data = {
            "message": status,
            "data": {
                "type": types,
                "result": data,
                "agent_name": agent_name,
                "status": status,
                "time": int(time.time()),
            },
        }
    elif kwargs.get("user_status"):
        data = {
            "message": status,
            "data": {
                "type": types,
                "result": message,
                "status": kwargs.get("user_status"),
                "time": int(time.time()),
            },
        }
    else:

        data = {
            "message": status,
            "data": {
                "type": types,
                "result": message,
                "status": "finished",
                "time": int(time.time()),
            },
        }

    if websocket.open:
        await websocket.send(json.dumps(data, ensure_ascii=False))


def handler_message(message: ChatCompletionMessage):
    # logger.info(f"message: {message}")
    if isinstance(message, Generator):
        return json.loads(next(message))
    if isinstance(message, dict) or message is None:
        return message
    if isinstance(message, list):
        return [handler_message(m) for m in message]
    if isinstance(message, ChatCompletionMessageToolCall):
        return {"role": "tool", "id": message.id, "name": message.function.name}
    if getattr(message, "function_call", None) is not None:
        return {
            "role": "system",
            "content": message.content,
            "function_call": message.function_call,
        }
    if getattr(message, "tool_calls", None) is not None:
        return {
            "role": "system",
            "content": message.content,
            "tool_calls": message.tool_calls,
        }
    if (
        getattr(message, "function_call", None) is not None
        and getattr(message, "tool_calls", None) is not None
    ):
        return {
            "role": "system",
            "content": message.content,
            "tool_calls": message.tool_calls,
            "function_call": message.function_call,
        }
    if isinstance(message, str):
        return json.loads(message)
    return {"role": "system", "content": message.content}


async def process_user_response(websocket):
    while True:
        try:
            user_respond = await asyncio.wait_for(websocket.recv(), 60)
            user_respond = json.loads(user_respond)
            if user_respond.get("type") == "ping":
                await websocket.send(json.dumps({"type": "pong"}))
                continue
            elif (
                user_respond.get("message") != "success"
                or user_respond.get("status") != "success"
            ):
                return {"status": "rejected"}
            if isinstance(user_respond, str):
                user_respond = json.loads(user_respond)
            return user_respond
        except asyncio.TimeoutError:
            function_response = {
                "status": "rejected",
                "message": "This agent is still being searched, please wait for the answer...",
            }
            return function_response


async def handler_agent(function_to_call, function_args, websocket):

    if inspect.iscoroutinefunction(function_to_call):
        # 处理异步函数
        user_request = await function_to_call(**function_args)
        return user_request

    elif inspect.isasyncgenfunction(function_to_call):
        # 处理异步生成器函数
        logger.info(f"function_to_call with async gen: {function_to_call}")
        gen = function_to_call(**function_args)

        async for data in gen:
            logger.info(f"data: {data}")
            if isinstance(data, str):
                data = json.loads(data)
            logger.info(f"with user_respond: {data}")
            if data.get("data"):
                await send_message(data, AgentFlow.TOOL_RESPOND.value, websocket)

                user_respond = await process_user_response(websocket)
                logger.info(f"=== user_respond: {user_respond}")
                if user_respond.get("status") == "rejected":
                    return agent_return_format(
                        user_respond.get("status"),
                        function_to_call.__name__,
                        "rejected",
                    )
                function_response = await gen.asend(user_respond.get("callback"))

                return function_response
            else:
                return data

    else:
        logger.info(f"function_to_call: {function_to_call}")
        data = function_to_call(**function_args)
        return data
        # 处理同步函数


async def cycle(memory: ChatMemory, websocket):
    memory.add(
        {
            "role": "system",
            "content": """Based on the above answers and current given function tools, please use as many tools as possible to facilitate answer to make it more cryptonative""",
        }
    )
    await ask(memory=memory, websocket=websocket, complete=True)


async def ask(memory: ChatMemory, websocket, complete=True):
    response = openai.chat.completions.create(
        # model="gpt-3.5-turbo-1106",
        model="gpt-4-1106-preview",
        messages=memory.get_messages(),
        tools=tools,
        tool_choice="auto",  # auto is default, but we'll be explicit
    )
    try:
        response_message = response.choices[0].message
        if response_message.content is None:
            response_message.content = ""
        if response_message.function_call is None:
            del response_message.function_call
        tool_calls = response_message.tool_calls
        logger.info(f"tool_calls----: {tool_calls}")
        suggestion_query = []

        if tool_calls:
            if len(tool_calls) > 1:
                complete = True
            await send_message(
                handler_message(tool_calls), AgentFlow.CALL.value, websocket
            )
            memory.add(response_message)
            function_args_list = []
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_to_call = tools_map[function_name]
                function_args = json.loads(tool_call.function.arguments)

                function_response = await handler_agent(
                    function_to_call, function_args, websocket
                )
                if isinstance(function_response, dict):
                    if function_response.get("status") == "rejected":
                        await send_message(
                            "User rejected the request.",
                            AgentFlow.RESPOND.value,
                            websocket,
                            user_status=function_response.get("status"),
                        )
                        return
                    function_response = json.dumps(function_response)
                if complete:
                    await send_message(
                        function_response, AgentFlow.TOOL_RESPOND.value, websocket
                    )
                memory.add(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": function_response,
                    }
                )  # extend conversation with function response
                function_args_list.append(function_args)
            for i in memory.get_messages():
                print(i, type(i))
                if isinstance(i, dict):
                    if i["role"] == "assistant":
                        del i
            second_response = openai.chat.completions.create(
                model="gpt-3.5-turbo-1106",
                # model="gpt-4-1106-preview",
                messages=memory.get_messages(),
            )
            agent_name = memory.get_messages()[-1]["name"]
            logger.info(f"agent_name: {agent_name} and args {function_args_list}")
            suggestion = await fetch_suggestion_query(agent_name)
            logger.warning(f" with suggestion: {suggestion} , agent_name: {agent_name}")
            for i in suggestion:
                i.replace("#", function_args_list[0].get("token", ""))
                suggestion_query.append(i)
            if len(memory.get_messages()) > 15:
                memory.clear()
            logger.info(f"second_response: {second_response}")
            response_message = second_response.choices[0].message.content
        if not isinstance(response_message, str):
            response_message = response_message.content
        if not complete:
            memory.add(
                {
                    "role": "assistant",
                    "content": response_message,
                }
            )
            await cycle(memory, websocket)

        await send_message(response_message, AgentFlow.RESPOND.value, websocket)
        logger.warning(f"---> {suggestion_query}")
        if suggestion_query:
            await asyncio.sleep(1)
            await send_message(suggestion_query, AgentFlow.SUGGESTION.value, websocket)
    except Exception:
        logger.error(f"error: {traceback.format_exc()}")
        await send_message(
            "Agent error with This question", AgentFlow.RESPOND.value, websocket
        )

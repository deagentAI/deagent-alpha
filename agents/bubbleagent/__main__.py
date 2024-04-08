import asyncio
import json
import traceback
import requests
from loguru import logger
from bubbleagent.config import app_settings
from bubbleagent.assistant.memory import ChatMemory
from bubbleagent.assistant.chat import ask
import websockets
from fastapi.encoders import jsonable_encoder


# async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     welcome_msg = """Hello, I am the smart assistant from BubbleAI!
# """
#     await context.bot.send_message(chat_id=update.effective_chat.id, text=welcome_msg)


memory = ChatMemory()


def newask(memory):
    url = "https://api.perplexity.ai/chat/completions"
    payload = {
        "model": "pplx-70b-online",
        "messages": memory.get_messages(),
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer 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",
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()["choices"][0]["message"]["content"]


async def chat( websocket: websockets.WebSocketServerProtocol):
    message = "我想知道最新btc 的价格"
    await asyncio.sleep(5)
    # user_query = update.message.text
    user_query = message
    memory.add({"role": "user", "content": user_query})
    try:
        response_message =  await asyncio.create_task(ask(memory, websocket))

        # await asyncio.gather(response_message)
        # response_message = await asyncio.to_thread(ask, memory, websocket)

    except Exception as e:
        logger.error(traceback.format_exc())
        response_message = "I met some error"

    logger.info(response_message)
    await websocket.send(json.dumps({"respond": response_message}))
    return response_message
    # await context.bot.send_message(
    #     chat_id=update.effective_chat.id, text=response_message
    # )


async def newchat(message: str):
    user_query = message
    # user_query = update.message.text
    # memory = ChatMemory()
    memory.add(
        {
            "role": "system",
            "content": "You are BubbleAI LLM model and be precise and concise",
        }
    )
    memory.add({"role": "user", "content": user_query})
    try:
        response_message = await asyncio.to_thread(newask, memory)
        logger.info(f"----->{response_message}")

    except Exception as e:
        logger.error(traceback.format_exc())
        response_message = "I met some error"
        print(e)
    return response_message

    # await context.bot.send_message(
    #     chat_id=update.effective_chat.id, text=response_message
    # )



async def main():
    async with websockets.serve(chat, "0.0.0.0", 8765):
        print("start to listen")
        await asyncio.sleep(600)
        await asyncio.Future()

asyncio.run(main())

import asyncio
import json
import traceback
import websockets
import uuid
from loguru import logger
from bubbleagent.config import app_settings
from bubbleagent.assistant.chat import ask
from bubbleagent.assistant.memory import ChatMemory
from redis.asyncio import Redis

# from aioredis import Redis
from bubbleagent.db.symbol_info import SymbolMapping


class WebSocketServer:
    def __init__(self):
        self.connections = {}  # Store connections by group

    async def connect_redis(self):
        self.redis = Redis.from_url(app_settings.REDIS_URL)

    async def register(self, websocket, group):
        if group not in self.connections:
            self.connections[group] = set()
        self.connections[group].add(websocket)
        print(f"New connection added to group {group}.")

    async def unregister(self, websocket, group):
        self.connections[group].remove(websocket)
        if not self.connections[group]:  # Remove group if empty
            del self.connections[group]
        print(f"Connection removed from group {group}.")

    # async def send_to_group(self, message, group):
    #     if group in self.connections:
    #         [await user.send(message) for user in self.connections[group]]

    async def authenticate(self, websocket) -> str:
        # headers = websocket.request_headers
        # logger.info(websocket.request_headers)
        # cookie_header = headers.get('Cookie', '')
        return uuid.uuid4().hex

    async def handler(self, websocket, path):

        await self.connect_redis()

        # memory data
        memory = ChatMemory()
        memory.add(
            {
                "role": "system",
                "content": """You are DeAgent LLM model, precise and concise. You must obey the following rules:
1. When answering the question, please only use specific HTML5 tags for content formatting without including the full HTML document structure (no <!DOCTYPE html>, <html>, <head>, or <body> tags). Focus on using <strong> for emphasis, <p> for paragraphs, <pre> and <code> for numerical data, and <a href="URL"> for external links. 
2.  Format any prices with abbreviations like K, M, B, T, P, E, Z, or Y as appropriate. Highlight positive and negative price changes and increase ratios with distinct div classes for clarity and distinction. The response should be structured for easy readability and styling on web platforms, emphasizing HTML5 formatting for content sections only. 
3. If user's question contains a new token in a multi-turn conversations, you must overlook the previous context and only return answers just contains the new token.""",
            }
        )
        group = await self.authenticate(websocket)
        logger.info(f"Group: {group}")
        if not group:
            print("Authentication failed.")
            return
        await self.register(websocket, group)
        try:
            await websocket.send(json.dumps({"type": "connected", "uuid": group}))
            async for message in websocket:
                try:
                    if isinstance(message, str):
                        message = json.loads(message)
                    if message.get("type") == "ping":
                        await websocket.send(json.dumps({"type": "pong"}))
                        continue
                    message = message.get("message")
                    memory.add({"role": "user", "content": message})
                    logger.info(f"Received message: {message}")
                    await asyncio.gather(
                        *[
                            asyncio.create_task(ask(memory, i))
                            for i in self.connections[group]
                        ]
                    )
                    logger.info(f"Sent message to group {group}.")
                except Exception as e:
                    logger.error(f"Message: {traceback.format_exc()}")
                    await websocket.send(
                        json.dumps({"type": "error", "message": str(e)})
                    )
                    # await self.send_to_group(f"Error: {e}", group)
                    continue

                # await self.send_to_group(f"Echo to {group}: {message}", group)
        finally:
            await self.unregister(websocket, group)


start_server = websockets.serve(
    WebSocketServer().handler, "0.0.0.0", 8765, ping_interval=5
)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

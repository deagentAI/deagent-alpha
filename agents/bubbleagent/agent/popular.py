import traceback
from loguru import logger
from bubbleagent.agent.base import BaseFunc
import requests
from bubbleagent.utils.fetch_data import fetch_popular_token_data
from bubbleagent.utils.format import agent_return_format

import json


class PopularFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "popularToken",
                "description": "Get the current papular token information  like address, description , liq, holders etc. From dextools and coingecko with Solana blockchain.",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "required": [],
                },
            },
        }

    async def do_func(self):
        agent_name = self.get_description()["function"]["name"]
        try:
            data = await fetch_popular_token_data()
            # logger.info(f"popular token data: {data}")
            if data:
                if len(data) > 5:
                    data = data[:5]
                return agent_return_format(data, agent_name)
            return agent_return_format([], agent_name, "error")
        except Exception:
            logger.error(f"Error in trading_day_agent: {traceback.format_exc()}")
            return json.dumps(
                {
                    "data": [],
                    "agent_name": agent_name,
                    "status": "failed",
                }
            )

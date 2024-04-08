import traceback

from loguru import logger
import requests
from bubbleagent.agent.base import BaseFunc
from pycoingecko import CoinGeckoAPI
import json
import time

from bubbleagent.db.symbol_info import TokenMapping
from bubbleagent.utils.fetch_data import fetch_cmc_coin_price, fetch_cmc_data
from bubbleagent.utils.format import agent_return_format


class PriceFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "price_agent",
                "description": "Get the the current market price and price change rate,  for the given token with token name ",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "token": {
                            "type": "string",
                            "description": "The name, alias or the contract address of the token",
                        },
                        "cmc_id": {
                            "type": "string",
                            "description": "The cmc id of the token",
                        },
                    },
                    "required": ["token"],
                },
            },
        }

    async def do_func(self, token, cmc_id=None):

        func_name = self.get_description()["function"]["name"]
        try:
            if cmc_id:
                cmc_id = str(cmc_id)
                coin_price = await fetch_cmc_coin_price(cmc_id)
                return agent_return_format(coin_price, func_name)

            token_info = await fetch_cmc_data(token)
            if token_info:
                ids_str = yield agent_return_format(token_info, func_name, "quote")
                ids = [i["id"] for i in token_info]
                ids = map(str, ids)
                ids_str = ",".join(ids)

        except Exception:
            logger.error(f"errow ith {traceback.format_exc()}")
            return agent_return_format({"token": token, "price": "unknown"}, func_name)

        # return json.dumps({"token": token, "price": price})

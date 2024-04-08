import traceback
from loguru import logger
from bubbleagent.agent.base import BaseFunc
from bubbleagent.config import app_settings
from bubbleagent.utils.fetch_data import (
    fetch_cmc_coin_info,
    fetch_cmc_coin_price,
    fetch_cmc_data,
)
from bubbleagent.utils.format import agent_return_format
import json


class TokenProfile(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "coinPedia",
                "description": "Get the price, volume, market cap, token project introduction and other details information of the token from CoinMarketCap.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "token": {
                            "type": "string",
                            "description": "The name, alias or the contract address or the token on Dex  of the token you want to get information about",
                        },
                    },
                    "required": ["token"],
                },
            },
        }

    async def do_func(self, token):
        agent_name = self.get_description()["function"]["name"]
        # return_data = None
        try:
            while True:
                data = await fetch_cmc_data(token)
                logger.info(f"token data: {data}")
                if data:
                    ids_list = [str(i["id"]) for i in data]
                    ids = ",".join(ids_list)
                    coin_price = await fetch_cmc_coin_price(ids)
                    name_list = [
                        {
                            "name": i["name"],
                            "value": i["slug"],
                            "token_info": coin_price.get(i["slug"]),
                        }
                        for i in data
                    ]
                    user_input = yield json.dumps(
                        agent_return_format(name_list, agent_name, "quote")
                    )
                    if inputs := user_input.get("result"):
                        token_info = await fetch_cmc_coin_info(inputs)
                        coin_price = coin_price.get(inputs)

                        if token_info:
                            return_data = {
                                "price_info": coin_price,
                                "token_info": token_info,
                            }
                        else:
                            return_data = {
                                "price_info": coin_price,
                                "token_info": f"#Apologies, but ${inputs} is such a new token that we're unable to provide an introduction at this time.",
                            }
                        yield json.dumps(agent_return_format(return_data, agent_name))

                else:
                    yield json.dumps({"agent_name": agent_name, "data": []})
        except Exception:
            logger.error(f"Error in trading_day_agent: {traceback.format_exc()}")
            yield json.dumps(
                {
                    "token": token,
                    "data": [],
                    "agent_name": agent_name,
                    "status": "failed",
                }
            )

import json
import traceback
from loguru import logger
import requests
from bubbleagent.agent.base import BaseFunc
from bubbleagent.utils.fetch_data import fetch_dextoken_data
from bubbleagent.utils.format import agent_return_format


class SwapFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "swapAssistant",
                "description": "Executes token transactions on Solana blockchain. It supports buying tokens, swapping between different tokens on decentralized exchanges (DEXs), or transferring tokens to a specified address. The function dynamically interacts with blockchain contracts based on provided parameters.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "token": {
                            "type": "string",
                            "description": "The token or name of the token on the Solana blockchain that you wish to receive as a result of the swap. This identifier is used to specify the target token for the transaction. Ensure the token corresponds accurately to the desired token on the Solana network to avoid any transaction errors.",
                        },
                    },
                    "required": ["token"],
                },
            },
        }

    def fetch_sol_price(self):
        price_data = requests.get("https://api.raydium.io/v2/main/price").json()
        return price_data["So11111111111111111111111111111111111111112"]

    async def do_func(self, token):
        agent_name = self.get_description()["function"]["name"]
        token_info = await fetch_dextoken_data(token)
        if not token_info:
            yield json.dumps(
                {
                    "data": [],
                    "status": "failed",
                    "message": "token not found",
                    "agent_name": agent_name,
                }
            )

        while True:
            try:
                if token_info:
                    tx = yield json.dumps(
                        agent_return_format(token_info, agent_name, "quote")
                    )
                    if tx:
                        yield json.dumps(
                            agent_return_format(
                                {"transaction hash": tx.get("tx")}, agent_name
                            )
                        )
                    else:
                        yield json.dumps(agent_return_format([], agent_name, "error"))
            except Exception:
                logger.error(traceback.format_exc())
                yield json.dumps(
                    {
                        "status": "failed",
                        "message": "token not found",
                    }
                )

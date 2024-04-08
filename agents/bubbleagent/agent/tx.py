import json
from bubbleagent.agent.base import BaseFunc


class TransferFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "transfer_token",
                "description": "Transfer a specific amount of token to a specific address",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "token": {
                            "type": "string",
                            "description": "The name, alias or the contract address of the token",
                        },
                        "to": {
                            "type": "string",
                            "description": "The address which the token will be transferred to",
                        },
                        "amount": {
                            "type": "number",
                            "description": "The amount to transfer",
                        },
                    },
                    "required": ["token", "to", "amount"],
                },
            },
        }

    def do_func(self, token, to):
        return json.dumps(
            {
                "status": "successful",
                "transaction hash": "0x17076a6f0e3dc0fcedfefb7a9c410261cf24cefb3cdf588c47733c103a72533f",
            }
        )

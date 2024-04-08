from bubbleagent.agent.base import BaseFunc
import requests
import time


import json


class ProtocolData(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "onChainData",
                "description": "This data provides an overview of all deFi Protocol , a liquid staking service that operates across multiple blockchain networks, including Ethereum, Solana, Moonbeam, Moonriver, and Terra Classic. Lido, symbolized , has a market capitalization of approximately $3.16 billion. The service's official website can be accessed at 'https://lido.fi/', and it offers a referral link for new users.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "protocol": {
                            "type": "string",
                            "description": "The name, alias or DeFi project protocol name",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "The number of protocols to return",
                        },
                    },
                    "required": [],
                },
            },
        }

    def do_func(self, protocol: str = None, limit: int = 100):
        print(time.time())
        data = requests.get(f"https://api.llama.fi/lite/protocols2?b=2").json()
        protocol_data = []

        count = 0
        for i in data["protocols"]:
            if not protocol and limit:
                if count == limit:
                    break
                count += 1
                single = dict(
                    symbol=i["symbol"],
                    name=i["name"],
                    tvl=i["tvl"],
                    mcap=i["mcap"],
                    chains=i["chains"],
                    referralUrl=i["url"],
                )
                protocol_data.append(single)
                continue

            if i["name"].lower() == protocol or i["symbol"].lower() == protocol:
                protocol_data.append(i)
        if protocol_data:
            return json.dumps(protocol_data)

        return json.dumps({"protocol": protocol, "data": "unknown"})

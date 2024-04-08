import traceback
from loguru import logger
from bubbleagent.agent.base import BaseFunc
from curl_cffi import requests
import re
from bs4 import BeautifulSoup
import json


class Yield(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "apyHunter",
                "description": "This data provides an overview of all deFi yield , a liquid staking service that operates across multiple blockchain networks, including Ethereum, Solana, Moonbeam, Moonriver, and Terra Classic. Lido, symbolized , The service's official website can be accessed at 'https://lido.fi/', and it offers a referral link for new users.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "project": {
                            "type": "string",
                            "description": "The type of  yield ",
                        },
                        "apy": {
                            "type": "integer",
                            "description": "The annual percentage yield apy in the project",
                        },
                        "tvl": {
                            "type": "string",
                            "description": "The total value locked tvl in the project",
                        },
                        "chain": {
                            "type": "string",
                            "description": "The chain of protocol yield",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "The number of results to return",
                        },
                    },
                    "required": [],
                },
            },
        }

    def fetch_data(self):

        headers = {
            "Host": "defillama.com",
            "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            "purpose": "prefetch",
            "x-nextjs-data": "1",
            "sec-ch-ua-mobile": "?0",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "sec-ch-ua-arch": '"arm"',
            "sec-ch-ua-full-version": '"122.0.6261.129"',
            "sec-ch-ua-platform-version": '"14.1.0"',
            "sec-ch-ua-full-version-list": '"Chromium";v="122.0.6261.129", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.129"',
            "sec-ch-ua-bitness": '"64"',
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"macOS"',
            "accept": "*/*",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://defillama.com/yields?project=All",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "if-none-match": 'W/"oh7i9i6j53bocj9"',
        }

        base_url = "https://defillama.com/"
        req = requests.get(base_url, headers=headers)

        soup = BeautifulSoup(req.text, "html.parser")
        hash_tag = ""
        script_tags = soup.find_all("script")
        hash_regex = re.compile(r"/static/([a-f0-9]+)/")
        for tag in script_tags:
            src = tag.get("src", "")
            match = hash_regex.search(src)
            if match:
                # 提取hash值
                hash_value = match.group(1)
                if "buildManifest.js" in src:
                    hash_tag = hash_value
        if hash_tag:
            url = f"https://defillama.com/_next/data/{hash_tag}/yields.json"
            params = {"project": "all"}
        else:
            return None

        try:
            response = requests.get(
                url,
                headers=headers,
                params=params,
                verify=False,
                impersonate="chrome110",
            )
            if response.status_code == 200:
                return response.json()["pageProps"]["pools"]
            return None
        except Exception as e:
            logger.error(f"---> {traceback.format_exc()}")
            return None

    def do_func(
        self,
        project: str = None,
        apy: int = 0,
        chain: str = None,
        tvl: str = None,
        limit: int = 10,
    ):
        try:
            agent_name = self.get_description()["function"]["name"]
            data = self.fetch_data()

            if data:
                return_data = []
                if tvl:
                    tvl = int(tvl)
                else:
                    tvl = 1e7
                if apy:
                    apy = float(apy)

                for i in data:

                    if limit:
                        if len(return_data) >= limit:
                            break
                    if project:
                        if i["project"].lower() != project.lower():
                            continue
                    if chain:
                        if i["chain"].lower() != chain.lower():
                            continue
                    if apy:
                        if i["apy"] < apy:
                            continue
                    if tvl:
                        if i["tvlUsd"] < tvl:
                            continue
                    return_data.append(
                        {
                            "name": i["project"],
                            "symbol": i["symbol"],
                            "audits": i["audits"],
                            "apy": i["apy"],
                            "icon": f"https://icons.llamao.fi/icons/protocols/{i['project']}?w=48&h=48",
                            "tvl": i["tvlUsd"],
                            "chain": i["chain"],
                            "url": i["url"],
                            "apyBase": i["apyBase"],
                            "apyReward": i["apyReward"],
                        }
                    )
                if len(return_data) > 10:
                    return_data = return_data[0:10]
                result = {"agent_name": agent_name, "data": return_data}
                return json.dumps(result)
        except Exception:
            logger.error(f"---> {traceback.format_exc()}")
            return json.dumps({"agent_name": agent_name, "data": []})
        return json.dumps({"agent_name": agent_name, "data": []})

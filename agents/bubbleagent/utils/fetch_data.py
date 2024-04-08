from ast import literal_eval
import json
import traceback
from bs4 import BeautifulSoup
from curl_cffi.requests import AsyncSession
from loguru import logger


async def fetch_coingecko_data(token):

    headers = {
        "authority": "www.coingecko.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6",
        "cache-control": "max-age=0",
        "dnt": "1",
        "if-none-match": 'W/"094c626031aa00ae927ef6c2fc2e8ee3"',
        "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-arch": '"arm"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"122.0.6261.128"',
        "sec-ch-ua-full-version-list": '"Chromium";v="122.0.6261.128", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"macOS"',
        "sec-ch-ua-platform-version": '"14.2.1"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Referer": "",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "DNT": "1",
        "Origin": "https://www.coingecko.com",
    }
    cookies = {
        "_ga": "GA1.1.1512922628.1710314386",
        "_gcl_au": "1.1.1702326879.1710314386",
        "_ga_LJR3232ZPB": "GS1.1.1710343982.2.0.1710343982.0.0.0",
        "_ga_1Y6C78JXR3": "GS1.1.1710343982.2.0.1710343982.0.0.0",
        "_session_id": "b60d5b0f03d2bbca02b3becc49883a3e",
        "__cf_bm": "91Qz3aHYm1aNHOmeEizCbcMHzbohCeIVCBaUdi1grTo-1711003322-1.0.1.1-8tNeN94mPmrTMImW_sU6pFGA5tKYHxi_W9pFYbgVyZXjL8cqfvuikxb7kKT_KWqNSRvF3yuMNPt_LkgeIyfIsA",
        "cf_chl_rc_m": "1",
        "cf_chl_3": "b9ab95a1e53eaa8",
        "cf_clearance": "Yn4V4WHlA8bIZBfsoKSP52c1llQp7bLA9Y8I6xxBDdc-1711003331-1.0.1.1-UPw6n_LXDb2AXS75UYQBA9pcKHmsuDOf_Vkl65szw7ZJXp.OWPvbXRZlPKjc.xtN87c3fsTzfgBE31wnxDV_bQ",
        "OptanonConsent": "isGpcEnabled=0&datestamp=Thu+Mar+21+2024+14%3A49%3A43+GMT%2B0800+(China+Standard+Time)&version=202312.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=dd599e04-1eae-493d-b989-09ff31d479dd&interactionCount=0&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A0%2CC0003%3A1&AwaitingReconsent=false",
    }
    url = "https://www.coingecko.com/en/search_v2"
    params = {"query": token, "vs_currency": "usd"}
    try:
        async with AsyncSession() as session:
            req = await session.get(
                url, headers=headers, cookies=cookies, params=params
            )
            data = req.json()
            if data:
                return data["coins"]
    except:
        return []
    # response = await requests.get(url, headers=headers, cookies=cookies, params=params)


async def fetch_price_with_coin_gecko(token):
    if not token:
        return 0
    async with AsyncSession() as session:
        try:
            url = f"https://api.coingecko.com/api/v3/simple/price?ids={token}&vs_currencies=usd"
            response = await session.get(url)
            if response.status_code == 200:
                data = response.json()
                return data[token]["usd"]
            return 0
        except:
            logger.error(
                f"error in fetch_price_with_coin_gecko: {traceback.format_exc()}"
            )
            return 0


async def fetch_suggestion_query(agent_name):
    async with AsyncSession() as session:
        url = "https://deagent.bba10000u.xyz/api/v1/agent/question"
        params = {"agent_name": agent_name}
        response = await session.get(url, params=params)
        if response.status_code == 200:
            agent_list = [i["question"] for i in response.json()["data"]]
            if isinstance(agent_list, str):
                return literal_eval(agent_list)
            return agent_list
        return []


async def fetch_popular_token_data():
    headers = {
        "authority": "www.dextools.io",
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6",
        "content-type": "application/json",
        "dnt": "1",
        "referer": "https://www.dextools.io/app/en/pairs",
        "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }

    url = "https://www.dextools.io/shared/hotpairs/hot"
    params = {"chain": "solana"}
    async with AsyncSession() as session:
        response = await session.get(
            url, headers=headers, params=params, impersonate="chrome110"
        )
        if response.status_code == 200:
            return_data = []
            pair_address = []
            for i in response.json()["data"][0]["data"]:
                # print(i.keys())
                try:
                    single_dict = dict()
                    token_info = i.get("token")
                    if not token_info:
                        continue
                    aduit = token_info.get("audit")
                    if aduit:
                        single_dict["is_honeypot"] = aduit.get("dextools", {}).get(
                            "is_honeypot"
                        )
                        single_dict["sell_tax"] = aduit.get("dextools", {}).get(
                            "sell_tax"
                        )
                        single_dict["buy_tax"] = aduit.get("dextools", {}).get(
                            "buy_tax"
                        )

                    metrics = token_info.get("metrics", {})
                    price = await fetch_price_with_coin_gecko(
                        token_info.get("info").get("coingecko")
                    )

                    if token_info["reprPair"]["id"]["pair"] in pair_address:
                        continue
                    single_dict["twitter"] = token_info.get("links").get("twitter")
                    single_dict["description"] = token_info["info"]["description"]
                    single_dict["name"] = token_info["name"]
                    single_dict["symbol"] = token_info["symbol"]
                    single_dict["price"] = price
                    single_dict["pair"] = token_info["reprPair"]["id"]["pair"]
                    single_dict["decimals"] = token_info["decimals"]
                    single_dict["market_cap"] = float(
                        metrics.get("circulatingSupply", 0)
                    ) * float(price)
                    single_dict["liq"] = metrics.get("maxSupply")
                    single_dict["total_supply"] = metrics.get("totalSupply")
                    single_dict["holders"] = metrics.get("holders")
                    single_dict["token_address"] = token_info["reprPair"]["id"]["token"]
                    single_dict["logo"] = (
                        "https://www.dextools.io/resources/tokens/logos/"
                        + token_info.get("logo")
                        if token_info.get("logo")
                        else ""
                    )
                    pair_address.append(token_info["reprPair"]["id"]["pair"])
                    return_data.append(single_dict)
                except Exception as e:
                    logger.info(
                        f"error in fetch_popular_token_data: {traceback.format_exc()}"
                    )
                    print("errr", e)

            return return_data
        return []


async def fetch_dextoken_data(token):

    headers = {
        "authority": "www.dextools.io",
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6",
        "content-type": "application/json",
        "dnt": "1",
        "referer": "https://www.dextools.io/app/en/pairs",
        "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }

    url = "https://www.dextools.io/shared/search/pair"
    params = {"query": token, "chains": "solana"}
    async with AsyncSession() as session:
        # url = "https://api.coinmarketcap.com/gravity/v4/gravity/global-search"
        # data = json.dumps(params)
        response = await session.get(
            url, headers=headers, params=params, impersonate="chrome110"
        )
        if response.status_code == 200:
            return_data = []
            pair_address = []
            for i in response.json()["results"]:
                # display.display_pretty(i.keys())
                # display.display(i["token"])
                icon = "https://www.dextools.io/resources/tokens/logos/solana/ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82.png?1710535740882"
                if (
                    i["token"]["reprPair"]["id"]["tokenRef"]
                    != "So11111111111111111111111111111111111111112"
                ):
                    continue

                token_info = i["token"]
                single_dict = dict()
                try:
                    metrics = token_info.get("metrics", {})

                    if token_info["reprPair"]["id"]["pair"] in pair_address:
                        continue
                    single_dict["twitter"] = token_info.get("links").get("twitter")
                    single_dict["price"] = i["price"]
                    single_dict["name"] = token_info["name"]
                    single_dict["symbol"] = token_info["symbol"]
                    single_dict["pair"] = token_info["reprPair"]["id"]["pair"]
                    single_dict["decimals"] = token_info["decimals"]
                    single_dict["market_cap"] = float(
                        metrics.get("circulatingSupply", 0)
                    ) * float(i.get("price", 0))
                    single_dict["liq"] = metrics.get("maxSupply")
                    single_dict["total_supply"] = metrics.get("totalSupply")
                    single_dict["holders"] = metrics.get("holders")
                    single_dict["vol"] = i.get("volume")
                    single_dict["token_address"] = token_info["reprPair"]["id"]["token"]
                    single_dict["logo"] = (
                        "https://www.dextools.io/resources/tokens/logos/"
                        + token_info.get("logo")
                        if token_info.get("logo")
                        else ""
                    )
                    pair_address.append(token_info["reprPair"]["id"]["pair"])
                    return_data.append(single_dict)

                except Exception as e:
                    pass
            return return_data
        return []


async def fetch_cmc_data(token):
    headers = {
        "content-type": "application/json",
        "date": "Thu, 21 Mar 2024 12:59:06 GMT",
        "x-cache": "Miss from cloudfront",
    }
    url = "https://api.coinmarketcap.com/gravity/v4/gravity/global-search"
    data = {"keyword": token, "scene": "community", "limit": 5}
    data = json.dumps(data, separators=(",", ":"))
    async with AsyncSession() as session:
        response = await session.post(
            url, headers=headers, data=data, impersonate="chrome110"
        )

        data = response.json()
        logger.info(f"--->the data=- {data}")
        for i in data["data"]["suggestions"]:
            if i.get("type") == "token":
                return i["tokens"]


async def fetch_trending_data(start_time):
    url = f"https://bubbleai.xyz/api/v1/bubble/trending_token?start_date={start_time}"
    resp = await fetch(url, {}, {})
    return_data = []
    if resp:
        for i in resp["data"]:
            del i["analysis_zh"]
            del i["introduce_zh"]
            del i["content_zh"]
            return_data.append(i)
    return return_data


async def fetch(url, headers=None, params=None, method="GET"):

    async with AsyncSession() as session:
        if method == "GET":
            response = await session.get(
                url, headers=headers, params=params, impersonate="chrome110"
            )
            if response.status_code == 200:
                return response.json()
        elif method == "POST":
            response = await session.post(
                url, headers=headers, data=params, impersonate="chrome110"
            )
            if response.status_code == 200:
                return response.json()
        return None


async def fetch_cmc_coin_price(token_id_list):
    headers = {
        "content-type": "application/json",
        "date": "Thu, 21 Mar 2024 12:59:06 GMT",
        "x-cache": "Miss from cloudfront",
    }
    url = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing"
    data = await fetch(
        url, headers=headers, method="GET", params={"ids": token_id_list}
    )
    return_dict = {}
    if data:
        try:
            for i in data["data"]["cryptoCurrencyList"]:
                icon = (
                    f"https://s2.coinmarketcap.com/static/img/coins/64x64/{i['id']}.png"
                )
                quotes = i["quotes"][0]
                symbol = i["symbol"]
                if "name" in quotes:
                    del quotes["name"]
                quotes["icon"] = icon
                quotes["symbol"] = symbol
                return_dict[i["slug"]] = quotes
            return return_dict
        except:
            pass
    return []


async def fetch_cmc_coin_info(toekn):
    headers = {
        "content-type": "application/json",
        "date": "Thu, 21 Mar 2024 12:59:06 GMT",
        "x-cache": "Miss from cloudfront",
    }
    async with AsyncSession() as session:
        url = f"https://coinmarketcap.com/currencies/{toekn}/"
        response = await session.get(
            url,
            headers=headers,
            impersonate="chrome110",
        )
        # print(response.text)
        soup = BeautifulSoup(response.text, "html.parser")
        token_info_div = soup.find("div", class_="sc-5f3326dd-0 kAOboQ")

        if token_info_div:
            return token_info_div.text
        return None


if __name__ == "__main__":
    import asyncio

    async def main():
        data = await fetch_popular_token_data()
        print(data)

    asyncio.run(main())

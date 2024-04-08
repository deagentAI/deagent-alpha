from bubbleagent.agent.weather import WeatherFunc

# from bubbleagent.agent.price import PriceFunc
from bubbleagent.agent.news import NewsFunc
from bubbleagent.agent.tx import TransferFunc
from bubbleagent.agent.swap import SwapFunc

from bubbleagent.agent.trending import TrendingFunc
from bubbleagent.agent.tvl import ProtocolData
from bubbleagent.agent.yields import Yield
from bubbleagent.agent.token_profile import TokenProfile
from bubbleagent.agent.popular import PopularFunc
from bubbleagent.agent.twitter import TwitterFunc

weatherFunc = WeatherFunc()
# priceFunc = PriceFunc()
# newsFunc = NewsFunc()
txFunc = TransferFunc()
swapFunc = SwapFunc()
twitterFunc = TwitterFunc()
trendingFunc = TrendingFunc()
tvlFunc = ProtocolData()
yieldFunc = Yield()
tokenProfileFunc = TokenProfile()
popularFunc = PopularFunc()

tools = [
    weatherFunc.get_description(),
    # priceFunc.get_description(),
    twitterFunc.get_description(),
    # newsFunc.get_description(),
    txFunc.get_description(),
    swapFunc.get_description(),
    trendingFunc.get_description(),
    tvlFunc.get_description(),
    yieldFunc.get_description(),
    tokenProfileFunc.get_description(),
    popularFunc.get_description(),
]

tools_map = {
    twitterFunc.get_name(): twitterFunc.do_func,
    weatherFunc.get_name(): weatherFunc.do_func,
    # priceFunc.get_name(): priceFunc.do_func,
    newsFunc.get_name(): newsFunc.do_func,
    txFunc.get_name(): txFunc.do_func,
    swapFunc.get_name(): swapFunc.do_func,
    trendingFunc.get_name(): trendingFunc.do_func,
    # tradingFunc.get_name(): tradingFunc.do_func,
    tvlFunc.get_name(): tvlFunc.do_func,
    yieldFunc.get_name(): yieldFunc.do_func,
    tokenProfileFunc.get_name(): tokenProfileFunc.do_func,
    popularFunc.get_name(): popularFunc.do_func,
}

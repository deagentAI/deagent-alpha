import time
import traceback
from loguru import logger
from bubbleagent.agent.base import BaseFunc
from bubbleagent.utils.fetch_data import fetch_trending_data
from bubbleagent.utils.format import agent_return_format


class TrendingFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "trendingCex",
                "description": "The trending day  information with CEX ",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "required": [],
                },
            },
        }

    async def do_func(self):
        agent_name = self.get_description()["function"]["name"]
        start_time = int(time.time() * 1000)
        try:
            trending_data = await fetch_trending_data(start_time)
            if trending_data:
                return agent_return_format(
                    agent_name,
                    trending_data,
                    "success",
                )
            return agent_return_format(agent_name, None, "failed")
        except Exception:
            logger.error(f"Error in trading_day_agent: {traceback.format_exc()}")
            return agent_return_format(agent_name, None, "failed")

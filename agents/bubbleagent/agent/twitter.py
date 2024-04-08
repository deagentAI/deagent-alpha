from bubbleagent.agent.base import BaseFunc
import requests
import time


import json

from bubbleagent.utils.format import agent_return_format


class TwitterFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "subTwitter",
                "description": "Get a twitter user's to subscribe to their tweets",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "twitter_name": {
                            "type": "string",
                            "description": "The name with twitter screen name",
                        },
                    },
                    "required": [],
                },
            },
        }

    def do_func(self, twitter_name: str = None):
        print(time.time())
        agent_name = self.get_description()["function"]["name"]
        try:
            url = "https://deagent.bba10000u.xyz/api/v1/twitter/screen_name?screen_name=meiridasai666"
            data = requests.get(url).json()["data"]
            return agent_return_format(
                agent_name,
                data,
                "success",
            )

        except:
            return agent_return_format(
                agent_name,
                [],
                "error",
            )

from bubbleagent.agent.base import BaseFunc
import json
class WeatherFunc(BaseFunc):
    def get_description(self):
        return {
            "type": "function",
            "function": {
                "name": "get_current_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA",
                        },
                        "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                    },
                    "required": ["location"],
                },
            },
        }
    
    def do_func(self, location, unit="fahrenheit"):
        """Get the current weather in a given location"""
        if "tokyo" in location.lower():
            return json.dumps({"location": "Tokyo", "temperature": "10", "unit": "celsius"})
        elif "san francisco" in location.lower():
            return json.dumps({"location": "San Francisco", "temperature": "72", "unit": "fahrenheit"})
        elif "paris" in location.lower():
            return json.dumps({"location": "Paris", "temperature": "22", "unit": "celsius"})
        else:
            return json.dumps({"location": location, "temperature": "unknown"})
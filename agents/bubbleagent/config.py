from pydantic import BaseSettings


class AppSettings(BaseSettings):
    TG_KEY: str = ""
    OPENAI_KEY: str = ""
    OPENAI_URL: str = "https://api.openai.com"
    REDIS_URL: str = "redis://localhost"
    DATABASE_URL: str = "mysql://root:root@localhost:3306/test"


app_settings = AppSettings()

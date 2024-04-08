from re import finditer
from playhouse.db_url import connect
from bubbleagent.config import app_settings
from peewee_async import Manager, MySQLDatabase
from peewee import Model, UUIDField
from playhouse.db_url import parse

from peewee import CharField, IntegerField
from playhouse.pool import PooledMySQLDatabase


def create_pooled_db_connection(url):
    parsed = parse(url)
    return PooledMySQLDatabase(
        parsed["database"],
        user=parsed["user"],
        password=parsed["passwd"],
        host=parsed["host"],
        port=parsed["port"],
        max_connections=32,
        stale_timeout=300,  # 连接在池中可以保持空闲的最大秒数，超过这个时间的连接将被关闭
    )


db = create_pooled_db_connection(app_settings.DATABASE_URL)


def make_table_name(model_class):
    model_name = model_class.__name__
    names = [name.lower() for name in camel_case_split(model_name)][0:-1]
    names.append("data_tbl")
    name = "_".join(names)
    # print(name)
    return name


def camel_case_split(identifier):
    matches = finditer(
        ".+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)", identifier
    )
    return [m.group(0) for m in matches]


class BaseModel(Model):
    # id = UUIDField(primary_key=True)
    class Meta:
        database = db
        table_function = make_table_name


class SymbolMapping(BaseModel):
    id = CharField()
    symbol = CharField()
    keyword1 = CharField()
    keyword2 = CharField()
    introduce = CharField()
    twitter_url = CharField()

    class Meta:
        table_name = "symbol_mapping"


class TokenMapping(BaseModel):
    id = CharField()

    symbol = CharField()
    name = CharField()
    chain = CharField()
    address = CharField()
    pool_address = CharField()
    decimal = IntegerField()
    quote_address = CharField()

    class Meta:
        table_name = "token_mappings"

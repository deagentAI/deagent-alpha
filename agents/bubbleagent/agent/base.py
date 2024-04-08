class BaseFunc:
    def get_description(self):
        raise NotImplementedError()

    def do_func(*args, **kwargs):
        raise NotImplementedError()

    # async def do_func(*args, **kwargs):
    #     raise NotImplementedError()

    def get_name(self):
        return self.get_description()["function"]["name"]

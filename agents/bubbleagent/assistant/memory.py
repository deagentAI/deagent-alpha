class ChatMemory:
    def __init__(self) -> None:
        self.memory = []

    def add(self, item):
        self.memory.append(item)

    def clear(self):
        self.memory = []

    def get_messages(self):
        return self.memory

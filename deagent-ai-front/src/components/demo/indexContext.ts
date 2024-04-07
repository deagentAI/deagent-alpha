import { createContext } from "react";
export const messageState = {
  chatMessage: {},
  handleSubMessage: (params: any) => {},
  chatUid: "",
};

export const MessageContext = createContext<any>(messageState);

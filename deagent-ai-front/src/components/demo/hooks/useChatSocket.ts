import { useEffect, useState } from "react";
import { useWebSocket } from "ahooks";

import { DEMO_CHART_WEB_SOCKET_URL, STORAGE_NAME } from "@src/constants";
import { useDemoStore } from "@src/store";

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}
export const useChatSocket = () => {
  const [chatUid, setChatUiId] = useState<any>("");
  const { storeCacheUid, cacheUid } = useDemoStore();
  // chat websocket
  const {
    readyState: chatState,
    sendMessage: sendChatMessage,
    latestMessage: chatMessage,
  } = useWebSocket(DEMO_CHART_WEB_SOCKET_URL as string, {
    onError: (err) => {
      console.log(err, "=err");
    },
  });

  useEffect(() => {
    let intervalId: any;
    if (sendChatMessage && chatState === ReadyState.Open) {
      // 每隔5s秒重新发起心跳
      sendChatMessage(JSON.stringify({ type: "ping" }));
      intervalId = setInterval(() => {
        sendChatMessage(JSON.stringify({ type: "ping" }));
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [chatState, sendChatMessage]);

  // 手动提交信息
  const handleSubMessage = ({
    value,
    uid,
    callbackSwap,
  }: {
    value: string;
    uid: string | undefined;
    callbackSwap?: "success" | "rejected";
  }) => {
    if (sendChatMessage && chatState === ReadyState.Open) {
      if (callbackSwap) {
        // 激活swap
        const params = {
          message: callbackSwap,
          callback: {
            result: value,
          },
          status: callbackSwap,
        };
        sendChatMessage(JSON.stringify(params));
      } else {
        sendChatMessage(JSON.stringify({ message: value }));
      }
      setChatUiId(uid);
      storeCacheUid(uid);
    }
  };
  useEffect(() => {
    if (cacheUid) {
      setChatUiId(cacheUid);
    }
  }, [cacheUid]);

  const handleSetChatUid = (uid: string) => {
    setChatUiId(uid);
  };
  return {
    chatMessage,
    handleSubMessage,
    chatUid,
    handleSetChatUid,
  };
};

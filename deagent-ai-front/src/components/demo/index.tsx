/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo } from "react";
import DaChat from "./component/da-chat";
import DaMap from "./component/da-map";
import DaTrangle from "./component/da-trangle";
import style from "./index.module.scss";
import { useChatSocket } from "./hooks/useChatSocket";
import { MessageContext } from "./indexContext";
import DaVideo from "./component/da-video";
import { useVideoStore } from "@src/store";
export type webSocketChartItemType = {
  chatMessage: any;
  chatUid: string;
  handleSubMessage: (data: any) => void;
};
interface Props {}

const Page: React.FC<Props> = (props) => {
  const {} = props;
  const { videoVisible } = useVideoStore();
  const { chatMessage, handleSubMessage, chatUid } = useChatSocket();
  return (
    <div className={style["app"]}>
      <MessageContext.Provider
        value={{ chatMessage, handleSubMessage, chatUid }}
      >
        {videoVisible ? (
          <DaVideo />
        ) : (
          <>
            <DaMap />
            <DaChat />
            <DaTrangle />
          </>
        )}
      </MessageContext.Provider>
    </div>
  );
};

export default memo(Page);

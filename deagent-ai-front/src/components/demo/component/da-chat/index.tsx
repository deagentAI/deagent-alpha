/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AccountBalanceWallet } from "@mui/icons-material";
import { DeagentLogo, ChatRobotIcon } from "@comp/global/svg-icon";
import { useDemoStore, useSuggestionStore } from "@src/store";
import { type webSocketChartItemType } from "@comp/demo/index";
import { useChatScrollToBottom } from "@comp/demo/hooks";
import { useIsPc } from "@src/hooks";
import { AniGasp } from "@src/utils";
import QuestionComp from "./QuestionComp";
import AnswerAuthor from "./AnswerAuthor";
import Suggest from "./Suggest";
import ChatInput from "./ChatInput";
import ChartRoom from "./ChartRoom";
import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props & Partial<webSocketChartItemType>> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();
  const { isToogle, answerStatus } = useDemoStore();
  const { handleToScroll } = useChatScrollToBottom();
  const { suggestList } = useSuggestionStore();
  const [chatVisible, setChatVisible] = useState(false);
  // 做transtion
  useEffect(() => {
    setChatVisible(isToogle);
  }, [isToogle]);

  // 滚动条滚到最底部
  useEffect(() => {
    handleToScroll();
  }, [answerStatus]);

  useEffect(() => {
    if (isPc) {
      new AniGasp({ id: ".deagent-app-chat" }).agentAssistantModule();
    }
  }, [chatVisible]);

  return (
    <Typography
      component={"div"}
      className={
        chatVisible
          ? `${style["app"]} deagent-app-chat`
          : `${style["app-hidden"]} deagent-app-chat-hidden`
      }
    >
      <Typography component={"div"} className="app-chat-header">
        <Typography component="div" className="flex items-center">
          <ChatRobotIcon />
          <span className="da-title">Deagent Assistant</span>
          <span className="compiling">Compiling</span>
        </Typography>
        <Typography component="div" className="customer-content-button">
          <WalletMultiButton
            startIcon={<AccountBalanceWallet />}
          ></WalletMultiButton>
        </Typography>
      </Typography>
      <Typography
        component="div"
        className="app-chat-body"
        id="deagent-chat-room"
      >
        <AnswerAuthor />
        <QuestionComp value="Welcome to Deagent.ai, a multiple AI agent network. Feel free to ask anyting about crypto & web3 and I will do my best to help you about your question :)" />
        <Suggest />
        {suggestList.length > 0 && <ChartRoom />}
      </Typography>

      {suggestList.length > 0 && <ChatInput />}
    </Typography>
  );
};

export default memo(Index);

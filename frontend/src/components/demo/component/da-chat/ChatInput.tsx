/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import clsx from "clsx";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { StopCircle as StopCircleIcon } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useHotkeys } from "react-hotkeys-hook";
import {
  ArrowCircleRight as ArrowCircleRightIcon,
  CleaningServices as CleaningServicesIcon,
} from "@mui/icons-material";
import { useDemoStore, ChartItem, useAgentListStore } from "@store/index";
import { useCheckIsWalletConnected } from "@comp/global/solana-layout/hooks";
import { MessageContext } from "@comp/demo/indexContext";
import { useChatScrollToBottom } from "@comp/demo/hooks";
import { guid } from "@utils/index";
import { DaWidgetComponentName } from "@src/constants";
import {
  agentCallUtil,
  updateAgentCall,
  updateAgentResponse,
  updateAgentSuggest,
  updateAgentAnswer,
} from "./chat_util";

import style from "./ChatInput.module.scss";
interface Props {}

// todo 发送指定消息，不走后台
const mockMessage =
  "please notify me by email when @dogecoin posts a tweet";

const ChatInput: React.FC<Props> = (props) => {
  const { chatMessage, handleSubMessage, chatUid } =
    useContext<any>(MessageContext);
  const { handleToScroll } = useChatScrollToBottom();
  const { walletConnect, handleConnectWallet } = useCheckIsWalletConnected();
  const {
    storeChatData,
    chartData,
    storeActiveAgentList,
    answerStatus,
    cacheUid,
    storeStatus,
    storeCacheUid,
  } = useDemoStore();

  const { storeAgentListVisible } = useAgentListStore();
  // 主要为了固定指定问题做demo视频来使用
  const [mockAnswerFlag, setMockAnswerFlag] = useState(false);
  // 判断消息是否真正返回，默认没有返回，在回答问题过程中，禁止再次询问
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const defaultAskMessage = "";
  const chartInputRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState(defaultAskMessage);
  const inputValue = useRef<any>(defaultAskMessage);
  const handleSubmit = () => {
    const value = inputValue.current.value;
    if (!value || isLoadingMessage) {
      return;
    }
    // 没有连接钱包就强制连接钱包
    if (!walletConnect) {
      handleConnectWallet();
      return;
    }
    const uid = guid();
    const item: ChartItem = {
      type: "ask",
      question: value.trim(),
      answer: "",
      uid,
      function_call: [],
      function_respond: "",
      status: "pending",
      agent_name: "",
      keyUid: "",
    };
    // 固定答案，暂时做demo视频用
    if (value === mockMessage) {
      [
        DaWidgetComponentName.reminder,
        DaWidgetComponentName.twitterTracker,
      ].forEach((v) => {
        const item: ChartItem & any = {
          type: "ask",
          question: value.trim(),
          answer:
            "We will notify you after the preferences are settled. Please filling the required parameters on the left then submit them.",
          uid,
          function_call: [],
          function_respond: "",
          status: "finished",
          agent_name: v,
          keyUid: guid(),
          // tracking: "",
          // email: "",
          // keyword: "",
          reminder: {}, // 只能申明一个对象方式存储动态字段
        };
        chartData.push(item);
      });
      storeCacheUid(uid);
      setMockAnswerFlag(true);
    } else {
      chartData.push(item);
    }
    storeStatus(0);
    storeChatData(chartData);
    setIsLoadingMessage(true);
    if (value !== mockMessage) {
      handleSubMessage({
        value,
        uid,
      });
    }
    inputValue.current.value = "";
    setSearchValue("");
    //提交问题
    handleToScroll();
  };
  useHotkeys("meta+enter,ctrl+enter, c", () => {
    console.log("Command + Enter was pressed");
  });
  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleClear = useCallback(() => {
    console.log(chartData, "=chartData");
    if (chartData.length === 0) {
      return;
    }
    setSearchValue("");
    inputValue.current.value = "";
    storeChatData([]);
    // 清除当前缓存的agentList
    storeActiveAgentList([]);
    storeStatus(0);
  }, [chartData]);

  const sendClass = clsx({
    "send-icon": true,
    "send-icon-disabled": searchValue === "",
  });
  const ClearWrapClass = clsx({
    "clear-icon": true,
    "clear-icon-disabled": chartData.length === 0,
  });

  const stopWrapClass = clsx({
    "stop-icon": true,
  });

  useEffect(() => {
    const currentData = JSON.parse(chatMessage?.data ?? "{}") || {};
    const chatIndex = chartData.findIndex((v) =>
      [chatUid, cacheUid].includes(v.uid)
    );
    const result = agentCallUtil(currentData);
    const { data, type, status, agent_name, time } = result;
    // 拷贝复制一份原始数据
    const cacheData = JSON.parse(JSON.stringify(chartData));
    // 调用agent的callback
    updateAgentCall(
      { type, data, chatIndex, cacheData, time, status },
      (newCacheData: any[]) => {
        storeChatData(newCacheData);
      }
    );
    // 调用agent的respond
    updateAgentResponse(
      { type, cacheData, chatIndex, agent_name, data, time, status },
      (newCacheData: any[]) => {
        storeAgentListVisible(true);
        storeChatData(newCacheData);
        handleToScroll();
      }
    );
    // 推荐问题
    updateAgentSuggest(
      { type, cacheData, chatIndex, data },
      (newCacheData: any[]) => {
        storeChatData(newCacheData);
        handleToScroll();
      }
    );
    // agent 最终的回答
    updateAgentAnswer(
      { cacheData, chatIndex, data, searchValue, time, status, type },
      (newCacheData: any[]) => {
        storeChatData(newCacheData);
        // 回答完毕
        setIsLoadingMessage(false);
        storeStatus(1);
        // 将滚动条质底部
        handleToScroll();
      }
    );
    // 做demo指定问题使用
    if (mockAnswerFlag) {
      storeAgentListVisible(true);
      handleToScroll();
    }
    console.log(cacheData, "=cacheData");
  }, [chatMessage, cacheUid, mockAnswerFlag]);

  useEffect(() => {
    if (answerStatus) {
      setIsLoadingMessage(false);
    }
  }, [answerStatus]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit();
      event.preventDefault();
    }
  };

  return (
    <div className={style["app"]} ref={chartInputRef}>
      <Tooltip
        title="clear history"
        placement="top"
        arrow
        PopperProps={{ container: () => chartInputRef.current }}
      >
        <CleaningServicesIcon
          className={ClearWrapClass}
          sx={{ color: "#8d95a1" }}
          onClick={handleClear}
        />
      </Tooltip>

      <TextareaAutosize
        minRows={"1"}
        placeholder="Message Chat Deagent.ai"
        ref={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyDown}
        value={searchValue}
      />
      <ArrowCircleRightIcon
        className={sendClass}
        sx={{ color: "#00fb93" }}
        onClick={handleSubmit}
      />
      {/* {isLoadingMessage && <StopCircleIcon className={stopWrapClass} />} */}
    </div>
  );
};

export default memo(ChatInput);

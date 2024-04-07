/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useRef, useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { useDemoStore, ChartItem, useSuggestionStore } from "@store/index";
import { guid } from "@utils/index";
import clsx from "clsx";
import { useCheckIsWalletConnected } from "@comp/global/solana-layout/hooks";
import { getAgentQuestionsApi } from "@src/services/api";
import BaseLoading from "@comp/global/base-loading";
import { useChatScrollToBottom } from "@src/components/demo/hooks";

import { MessageContext } from "@comp/demo/indexContext";
import Tag from "./Tag";

import style from "./Suggest.module.scss";
interface Props {}
type TagItem = ChartItem;

const defaultSuggestion = [
  {
    id: 1,
    primary_issue: "What is  BOME coin",
    create_time: "1711175863108",
  },
  {
    id: 2,
    primary_issue: "Please help me to find out the 10 latest news of $SOL",
    create_time: "1711175863108",
  },
  {
    id: 3,
    primary_issue: "Which pool has the best APY performance on Solana chain",
    create_time: "1711175863108",
  },
  {
    id: 5,
    primary_issue: "What is the current price of $BOME",
    create_time: "1711175863108",
  },
];
const Suggest: React.FC<Props> = (props) => {
  const { chatMessage, handleSubMessage, chatUid } = useContext(MessageContext);
  const { handleToScroll } = useChatScrollToBottom();
  const { walletConnect, handleConnectWallet } = useCheckIsWalletConnected();
  // 0 正在加载，1加载完毕 2没有数据
  const [loadingStatus, setLoadingStatus] = useState(0);
  const { storeChatData, chartData, storeCacheUid, storeStatus } =
    useDemoStore();
  const { storeSuggestList, suggestList } = useSuggestionStore();
  const hasData = useRef<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  // const [defaultSuggest, setDefaultSuggest] = useState<TagItem[]>([]);

  const getDefaultQuestions = async () => {
    try {
      const res = (await getAgentQuestionsApi()) || defaultSuggestion;
      if (res.length > 0) {
        setLoadingStatus(1);
      } else {
        setLoadingStatus(2);
      }
      const result = res?.map((item: any) => {
        return {
          type: "ask",
          question: item.primary_issue,
          answer: "",
        };
      });
      storeSuggestList(result);
    } catch (error) {
      setLoadingStatus(2);
    }
  };

  const handleTag = (v: any, index: number) => {
    if (!walletConnect) {
      handleConnectWallet();
      return;
    }
    // if (!hasData.current.includes(v.question)) {
    //   const uid = guid();
    //   hasData.current.push(v.question);
    //   chartData.push({
    //     ...v,
    //     uid,
    //     function_call: [],
    //     function_respond: [],
    //   });
    //   setSearchValue(v.question);
    //   // storeChatData(chartData);
    //   handleSubMessage({
    //     value: v.question,
    //     uid,
    //   });
    // }

    const uid = guid();
    v.active = true;
    hasData.current.push(v.question);
    chartData.push({
      ...v,
      uid,
      function_call: [],
      function_respond: [],
    });
    setSearchValue(v.question);
    // storeChatData(chartData);
    handleSubMessage({
      value: v.question,
      uid,
    });
    storeStatus(0);
    storeSuggestList(suggestList);
    handleToScroll();
    storeCacheUid(uid);
  };

  useEffect(() => {
    getDefaultQuestions();
  }, []);

  useEffect(() => {
    // 更新chatRoom
    const currentData = JSON.parse((chatMessage as any)?.data ?? "{}") || {};
    const chatIndex = chartData.findIndex((v) => v.uid === chatUid);
    if (currentData?.respond) {
      chartData[chatIndex].answer = currentData?.respond;
      chartData[chatIndex].question = searchValue;
      storeChatData(chartData);
    }
  }, [chatMessage, chartData, searchValue]);

  const activeItemClass = (activeStatus: boolean | undefined) =>
    clsx({
      ["active-item"]: activeStatus,
    });

  return (
    <Typography component={"div"} className={style["app"]}>
      <Typography className="suggest-title" component={"h1"}>
        # We Recommend Your Journey From Following Topics
      </Typography>
      {loadingStatus === 0 && <BaseLoading />}
      {loadingStatus === 1 &&
        suggestList.map((v: TagItem, index) => (
          <Tag
            key={index}
            className={activeItemClass(v.active)}
            text={v.question}
            onClick={() => handleTag(v, index)}
          ></Tag>
        ))}
    </Typography>
  );
};

export default memo(Suggest);

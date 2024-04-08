/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import { motion, useDragControls } from "framer-motion";
import { DaWidgetComponentName } from "@src/constants";
import { useDemoStore, useAgentListStore } from "@src/store";
import { DataEmpty } from "@comp/global";
import {
  filteredAgentList,
  filterAgentListByUid,
  filterChatDataByMoreAgent,
} from "@src/utils";
import {
  CoinpediaIcon,
  BubbleNewsIcon,
  JellyQuantIcon,
  OnchainWatcherIcon,
  ReminderIcon,
  StakeAgentIcon,
  SwapAgentIcon,
  TrackerIcon,
  SwapAssistantIcon,
} from "@comp/global/svg-icon/agent-list";
import AgentHeader from "./AgentHeader";
import History from "./History";
import List from "./List";
import BubbleNews from "./bubble-news";
import JellyQuant from "./jelly-quant";
import OnchainData from "./onchaindata";
import SwapAssistantCallAgent from "./swap-assistant/CallAgent";
import StakeAgent from "./stake-agent";
import CallAgent from "./coin-pedia/CallAgent";
import ApyHunter from "./apy-hunter";
import PopularToken from "./popular-token";
import TwitterTracker from "./twitter-tracker";
import Reminder from "./reminder";
import TrendingCex from "./trending-cex";

import style from "./index.module.scss";

interface Props {
  dom: any;
}

// const mockAgentList = [
//   {
//     agent_name: DaWidgetComponentName.twitterTracker,
//     function_call: [],
//     function_respond: [],
//     keyUid: "1",
//     uid: "2",
//     answer: "",
//     status: "",
//     question: "",
//     time: Date.now(),
//     type: "ask",
//   },
//   {
//     agent_name: DaWidgetComponentName.reminder,
//     function_call: [],
//     function_respond: [],
//     keyUid: "1",
//     uid: "2",
//     answer: "",
//     status: "",
//     question: "",
//     time: Date.now(),
//     type: "ask",
//   },
// ];

const Index: React.FC<Props> = (props) => {
  const { dom } = props;
  const controls = useDragControls();
  const { chartData, cacheUid, storeActiveAgentList, answerStatus } =
    useDemoStore();
  const { agentListVisible } = useAgentListStore();
  const [activeIndex, setActiveIndex] = useState(0);
  // const [agentList, setAgentList] = useState([]);

  // useEffect(() => {
  //   console.log(chartData, "ssss123");
  //   if (chartData.length > 0) {
  //     const lastNewAgent: any = chartData[chartData.length - 1];
  //     const result: any = defaultAgentList.filter(
  //       (v) => v.type === lastNewAgent?.agent_name
  //     );
  //     console.log(result, "==22=result");
  //     setAgentList(result);
  //   }
  // }, [chartData]);
  const defaultAgentList = [
    {
      title: "Coinpedia",
      type: DaWidgetComponentName.coinPedia,
      component: <CallAgent />,
      icon: <CoinpediaIcon />,
    },
    {
      title: "BubbleNewsHunter",
      type: DaWidgetComponentName.bubblenews,
      component: <BubbleNews />,
      icon: <BubbleNewsIcon />,
    },
    {
      title: "OnchainWatcher",
      type: DaWidgetComponentName.onchaindata,
      component: <OnchainData />,
      icon: <OnchainWatcherIcon />,
    },
    {
      title: "JellyQuant",
      type: DaWidgetComponentName.jellyQuant,
      component: <JellyQuant />,
      icon: <JellyQuantIcon />,
    },
    {
      title: "SwapAssistant",
      type: DaWidgetComponentName.swapAssistant,
      component: <SwapAssistantCallAgent />,
      icon: <SwapAgentIcon />,
    },
    {
      title: "StakeAgent",
      type: DaWidgetComponentName.stakeAgent,
      component: <StakeAgent />,
      icon: <StakeAgentIcon />,
    },
    {
      title: "apyHunter",
      type: DaWidgetComponentName.ApyHunter,
      component: <ApyHunter />,
      icon: "",
    },
    {
      title: "popularToken",
      type: DaWidgetComponentName.popularToken,
      component: <PopularToken />,
      icon: "",
    },
    {
      title: "TwitterTracker",
      type: DaWidgetComponentName.twitterTracker,
      component: <TwitterTracker />,
      icon: <TrackerIcon />,
    },
    {
      title: "DeagentReminder",
      type: DaWidgetComponentName.reminder,
      component: <Reminder />,
      icon: <ReminderIcon />,
    },
    {
      title: "TrendFollower",
      type: DaWidgetComponentName.trendingCex,
      component: <TrendingCex />,
      icon: "",
    },
  ];

  // Please tell me the trending token
  // const mockAgentFlag = false;
  const agentList = useMemo(() => {
    // if (mockAgentFlag) {
    //   return filteredAgentList(mockAgentList, defaultAgentList);
    // }
    if (chartData.length > 0) {
      // 匹配一个问题调用多个agent
      const agentNewList = filterChatDataByMoreAgent()(
        chartData.filter((v) => v.uid === cacheUid && v.agent_name)
      );
      if (agentNewList.length > 1) {
        const result = filteredAgentList(agentNewList, defaultAgentList);
        storeActiveAgentList(result.map((v: any) => v.type));
        return result;
      }
      const lastNewAgent: any = chartData.findLast((v) => v.uid === cacheUid);
      const result: any = defaultAgentList.filter(
        (v) => v.type === lastNewAgent?.agent_name
      );
      storeActiveAgentList(result.map((v: any) => v.type));
      return result;
    }
    return [];
  }, [chartData, chartData.length, cacheUid]);

  const status = useMemo(() => {
    if (answerStatus === 1) {
      return "finished";
    }
    if (chartData.length > 0) {
      const lastNewAgent: any = chartData.findLast(
        (v) => v.uid === cacheUid
      ) || { status: "" };
      const { status } = lastNewAgent;
      return status;
    }

    return "quote";
  }, [chartData, chartData.length, cacheUid, answerStatus]);

  const historyData = useMemo(() => {
    const result = filterAgentListByUid(chartData, "uid");
    return result.map((v) => {
      return {
        title: v.question,
        time: Number(v.time) * 1000,
        agents: v.function_call?.length || 0, // 调用agent的个数
      };
    });
  }, [chartData, chartData.length]);

  const handleActive = (index: number) => {
    setActiveIndex(index);
  };

  const appWrapClass = clsx({
    [style["app"]]: true,
    [style["app-hidden"]]: !agentListVisible,
  });

  const CurrentCom = useMemo(() => {
    if (activeIndex === 0) {
      if (agentList.length === 0) {
        return (
          <DataEmpty description="#Give us an intent and our agents will change the world." />
        );
      }
      return <List list={agentList} status={status} />;
    }
    if (historyData.length === 0) {
      return (
        <DataEmpty description="#Give us an intent and our agents will change the world." />
      );
    }
    return <History list={historyData} />;
  }, [activeIndex, historyData, agentList, answerStatus]);

  const handleStartDarg = (event: any) => {
    controls.start(event);
    event.stopPropagation();
  };

  return (
    <motion.div
      drag={false}
      dragControls={controls}
      onPointerDown={handleStartDarg}
      dragConstraints={dom}
      className={appWrapClass}
    >
      {agentListVisible ? (
        <>
          <AgentHeader activeIndex={activeIndex} onChange={handleActive} />
          {CurrentCom}
        </>
      ) : null}
    </motion.div>
  );
};

export default memo(Index);

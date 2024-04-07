/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @description 请添加组件描述
 * @author maicFir
 */

"use client";
import React, { memo, useState, useEffect, useContext, useRef } from "react";
import clsx from "clsx";
import { useDemoStore, ChartItem } from "@store/index";
import { BaseDotPulse, BaseTypeText } from "@comp/global";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { MessageContext } from "@comp/demo/indexContext";
import { DaWidgetComponentName } from "@src/constants";
import { useGetWalletAddress } from "@comp/demo/hooks";

import { filterAgentListByUid, filterMergeByUid } from "@src/utils";
import AgentSuggest from "./AgentSuggest";
import Swap from "./Swap";
import QuestionComp from "./QuestionComp";
import AnswerAuthor from "./AnswerAuthor";
import ReminderComp from "./ReminderComp";
import style from "./ChatRoom.module.scss";

interface Props {}

const ChartRoom: React.FC<Props> = (props) => {
  const { handleSubMessage, chatMessage, chatUid } =
    useContext<any>(MessageContext);
  const { walletAddress } = useGetWalletAddress();
  const { chartData, storeStatus, swapParams, storeChatData } = useDemoStore();
  // 解决直接使用chartData会产生水合问题
  const [roomData, setRoomData] = useState<any[]>([]);
  let timeId: any = null;
  useEffect(() => {
    // const currentChatData = filterChatDataByMoreAgent()(chartData);
    const currentData = filterAgentListByUid(chartData, "uid");
    setRoomData(currentData);

    // 如果这个回答查询超过一分钟，则默认给个回答
    timeId = setTimeout(() => {
      currentData.forEach((v: any) => {
        if (v.answer === "") {
          v.answer =
            "This agent is still being searched, please wait for the answer...";
        }
        storeStatus(1);
      });
      setRoomData(currentData);
    }, 1000 * 60);
    return () => {
      clearTimeout(timeId);
    };
  }, [chartData.length, chartData, (swapParams as any)?.uid]);

  const answerContentClass = (v: any) =>
    clsx({
      "answer-content": true,
      "answer-content-hidden":
        v.agent_name === DaWidgetComponentName.reminder &&
        v.answer &&
        v.reminder.reminderFlag,
    });

  return (
    <div className={style["app"]}>
      {roomData?.map((v: ChartItem & any, index: number) => {
        return (
          <div key={v.keyUid} className="chat-wrap-item">
            <QuestionComp value={v.question} placement="right">
              <AnswerAuthor name={walletAddress} icon={<AccountCircleIcon />} />
            </QuestionComp>
            <div className="answer">
              <AnswerAuthor />
              {v.status === "quote" && (
                <QuestionComp value="We have found several tokens that may matched your intent, please choose the one you want then we will keep the sequence ..." />
              )}

              {v.agent_name === DaWidgetComponentName.swapAssistant &&
                v.swapParams.flag && (
                  <Swap
                    swapParams={v.swapParams}
                    handleSubMessage={handleSubMessage}
                    chatMessage={chatMessage}
                    chatUid={chatUid}
                  />
                )}

              {v.agent_name === DaWidgetComponentName.reminder &&
                v.reminder.reminderFlag && (
                  <QuestionComp
                    value={<ReminderComp value={v} />}
                    className="reminder-comp"
                  ></QuestionComp>
                )}

              <div className={answerContentClass(v)}>
                {v.answer ? (
                  <BaseTypeText data={v.answer} className="base-type-text" />
                ) : (
                  <BaseDotPulse />
                )}
              </div>
              {Array.isArray(v.agent_suggestion_data) &&
                v.agent_suggestion_data.length > 0 && (
                  <AgentSuggest data={v.agent_suggestion_data} />
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ChartRoom);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useMemo, useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { ChartItem, useDemoStore } from "@store/index";
import BaseLoading from "@comp/global/base-loading";
import List from "./List";
import CoinPediaResult from "./index";
import style from "./CallAgent.module.scss";
import { MessageContext } from "@/components/demo/indexContext";
import { DaWidgetComponentName } from "@/constants";
import { useGetAgentList } from "@/components/demo/hooks";
interface Props {}

const CallAgent: React.FC<Props> = (props) => {
  const {} = props;
  const { chatUid } = useContext(MessageContext);

  const { chartData, searchStatus, storeSearchStatus, cacheUid } =
    useDemoStore();

  const { agentList } = useGetAgentList(DaWidgetComponentName.coinPedia);

  useEffect(() => {
    let timerId: any = null;
    const lastNewAgent: any = chartData.filter(
      (v) =>
        v.uid === cacheUid && v.agent_name === DaWidgetComponentName.coinPedia
    );
    const target_item = lastNewAgent.findLast(
      (v: any) =>
        v.uid === cacheUid && v.agent_name === DaWidgetComponentName.coinPedia
    );
    if (
      target_item.function_respond &&
      Array.isArray(target_item.function_respond) &&
      target_item.function_respond.length > 0
    ) {
      storeSearchStatus(1);
    }
    if (
      target_item.function_respond &&
      Object.prototype.toString.call(target_item.function_respond) ===
        "[object Object]"
    ) {
      storeSearchStatus(2);
    }
    console.log(searchStatus, "===searchStatus");

    return () => {
      clearTimeout(timerId);
    };
  }, [chartData, chatUid]);

  return (
    <div className={style["app"]}>
      {searchStatus === 0 && <BaseLoading />}
      {(searchStatus === 1 || searchStatus === 2) &&
        agentList?.map((v: ChartItem, index: number) => {
          return (
            <div key={index} className="chat-wrap-item">
              {searchStatus === 1 && Array.isArray(v.function_respond) ? (
                <div className="answer-content-quote">
                  <div className="answer-title">
                    Please choose one to continue:
                  </div>
                  <div className="answer-content-quote-wrap">
                    <List data={v.function_respond} dataItem={v} />
                  </div>
                </div>
              ) : null}
              {searchStatus === 2 && (
                <CoinPediaResult dataItem={v.function_respond} />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default memo(CallAgent);

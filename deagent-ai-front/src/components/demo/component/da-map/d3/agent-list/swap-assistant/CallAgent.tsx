/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";

import SwapAssistantContent from "./index";
import style from "./CallAgent.module.scss";

import { DaWidgetComponentName } from "@/constants";
import { useGetAgentList } from "@/components/demo/hooks";
interface Props {}

const CallAgent: React.FC<Props> = (props) => {
  const {} = props;

  const { agentList } = useGetAgentList(DaWidgetComponentName.swapAssistant);

  return (
    <div className={style["app"]}>
      {agentList?.map((v: any, index: number) => {
        return (
          <div key={index} className="chat-wrap-item">
            {Array.isArray(v.function_respond) ? (
              <div className="answer-content-quote">
                <div className="answer-content-quote-wrap">
                  <SwapAssistantContent data={v.function_respond} item={v} />
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default memo(CallAgent);

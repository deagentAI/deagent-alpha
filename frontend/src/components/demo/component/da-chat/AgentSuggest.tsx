/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useContext, useState } from "react";
import { Typography } from "@mui/material";
import clsx from "clsx";
import { MessageContext } from "@comp/demo/indexContext";
import { guid } from "@utils/index";
import { useDemoStore, ChartItem } from "@store/index";
import { useChatScrollToBottom } from "@comp/demo/hooks";
import style from "./AgentSuggest.module.scss";

interface Props {
  data?: any[];
}

const AgentSuggest: React.FC<Props> = (props) => {
  const { data = [] } = props;
  const { handleSubMessage } = useContext(MessageContext);
  const { chartData, storeChatData, storeCacheUid } = useDemoStore();
  const { handleToScroll } = useChatScrollToBottom();
  const [question, setQuestion] = useState<string[]>([]);

  const handleSuggestion = (value: string) => {
    const uid = guid();
    const item: ChartItem = {
      type: "ask",
      question: value,
      answer: "",
      uid,
      function_call: [],
      function_respond: "",
      status: "",
      agent_name: "",
      keyUid: "",
    };
    chartData.push(item);
    storeChatData(chartData);
    storeCacheUid(uid);
    handleSubMessage({
      value,
      uid,
    });
    question.push(value);
    setQuestion(question);
    handleToScroll();
  };
  const itemActiveClass = (val: string) =>
    clsx({
      ["item-active"]: question.includes(val),
    });
  return (
    <Typography component={"div"} className={style["app"]}>
      <Typography component={"h2"}>
        base on your topic, you may want to know:
      </Typography>
      <Typography component={"ul"}>
        {data.map((v) => {
          return (
            <Typography
              component={"li"}
              key={v}
              className={itemActiveClass(v)}
              onClick={() => handleSuggestion(v)}
            >
              {v}
            </Typography>
          );
        })}
      </Typography>
    </Typography>
  );
};

export default memo(AgentSuggest);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useState } from "react";
import { Typography } from "@mui/material";
import clsx from "clsx";
import { CoinClatterIcon } from "@comp/global/svg-icon";
import LoadDot from "@/components/global/base-dot-pulse/LoadDot";
import { useAgentListStore } from "@src/store";
import { MessageStatus } from "@src/constants";

import style from "./index.module.scss";

interface Props {
  list: any[];
  status?: string;
}
const statusText: { [key: string]: any } = {
  [MessageStatus.quote]: "Network compiling",
  [MessageStatus.error]: "Network error",
  [MessageStatus.success]: "Network connected",
  [MessageStatus.finished]: "Finished",
};

const Index: React.FC<Props> = (props) => {
  const { list, status } = props;
  const { foldStatus, storeFoldStatus } = useAgentListStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleToggle = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
      if (foldStatus) {
        storeFoldStatus(true);
      }
    } else {
      if (foldStatus) {
        storeFoldStatus(false);
      }
      setActiveIndex(index);
    }
  };
  const contentBodyClass = (index: number) =>
    clsx({
      ["inner-content-active"]: activeIndex === index,
      ["inner-content-active-hidden"]: foldStatus,
    });

  const statusClass = clsx({
    ["value-status"]: true,
    ["value-status-quote"]: status === MessageStatus.quote,
    ["value-status-finished"]: status === MessageStatus.finished,
    ["value-status-success"]: status === MessageStatus.success,
    ["value-status-error"]: status === MessageStatus.error,
  });

  return (
    <Typography component={"ul"} className={style["app-body"]}>
      {list.map((v: any, index: number) => (
        <Typography
          key={v.keyUid}
          component={"li"}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          className="list-app-item"
        >
          <Typography
            component={"div"}
            className="top"
            display={"flex"}
            alignItems={"center"}
            onClick={() => handleToggle(index)}
          >
            <Typography
              component={"div"}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography component={"div"} className="icon">
                {v.icon ? v.icon : <CoinClatterIcon />}
              </Typography>
              <Typography component={"div"} sx={{ paddingLeft: "10px" }}>
                <Typography component={"p"}>{v.title}</Typography>
                <p></p>
              </Typography>
            </Typography>
            <Typography component={"div"} className="status-wrap">
              {["", String(MessageStatus.quote)].includes(String(status)) && (
                <LoadDot />
              )}
              {status === MessageStatus.error && (
                <span className="error-status-radius"></span>
              )}
              {status === MessageStatus.finished && (
                <span className="finished-status-radius"></span>
              )}
              <span className={`value ${statusClass}`}>
                {statusText[status as string] || "Processing"}
              </span>
            </Typography>
          </Typography>
          <Typography
            component={"div"}
            className={`inner-content ${contentBodyClass(index)}`}
          >
            {v.component}
          </Typography>
        </Typography>
      ))}
    </Typography>
  );
};

export default memo(Index);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useState } from "react";
import { Typography } from "@mui/material";
import {
  Close as CloseIcon,
  CloseFullscreen as CloseFullscreenIcon,
  DoNotDisturbOn as DoNotDisturbOnIcon,
  CheckCircleOutlined,
} from "@mui/icons-material";

import clsx from "clsx";
import LoadDot from "@/components/global/base-dot-pulse/LoadDot";
import { useAgentListStore, useDemoStore } from "@src/store";

interface Props {
  activeIndex: number;
  onChange: (index: number) => void;
}
type TabItemType = {
  title: string;
  disabled: boolean;
};
const Index: React.FC<Props> = (props) => {
  const { activeIndex, onChange } = props;
  const { answerStatus } = useDemoStore();
  const { storeFoldStatus, storeAgentListVisible } = useAgentListStore();
  const [defaultTab, setDefaultTab] = useState<TabItemType[]>([
    {
      title: "Agent List",
      disabled: false,
    },
    {
      title: "Query history",
      disabled: false,
    },
  ]);

  const tabWrapClass = (v: TabItemType, index: number) =>
    clsx({
      active: index === activeIndex,
      disabled: v.disabled,
    });
  const handleTabChange = (v: TabItemType, index: number) => {
    if (v.disabled) {
      return;
    }
    onChange?.(index);
  };
  const handleClose = () => {
    storeAgentListVisible(false);
  };
  // 缩小
  const handleZoonIn = () => {
    storeFoldStatus(false);
  };
  // 放大
  const handleZoomOut = () => {
    storeFoldStatus(true);
  };
  return (
    <Typography component={"div"} className="app-header">
      <Typography
        component={"ul"}
        display={"flex"}
        justifyContent={"flex-start"}
      >
        {defaultTab.map((v, index) => (
          <Typography
            component={"li"}
            key={index}
            onClick={() => handleTabChange(v, index)}
            className={tabWrapClass(v, index)}
          >
            {v.title}
          </Typography>
        ))}
      </Typography>
      <Typography component={"div"} className="compiling">
        {answerStatus === 0 && <LoadDot />}
        {answerStatus === 1 && <CheckCircleOutlined />}
        <Typography
          className="net-work-compiling"
          component={"span"}
          sx={{ paddingLeft: "5px" }}
        >
          Network {answerStatus === 0 ? "compiling" : "compiled"}
        </Typography>
      </Typography>
      <Typography component={"div"} className="option-button">
        <div className="zoom-in" onClick={handleClose}>
          <CloseIcon />
        </div>
        <div className="zoom-out" onClick={handleZoomOut}>
          <DoNotDisturbOnIcon />
        </div>
        <div className="close-icon" onClick={handleZoonIn}>
          <CloseFullscreenIcon />
        </div>
      </Typography>
    </Typography>
  );
};

export default memo(Index);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import clsx from "clsx";
import { Typography } from "@mui/material";
import { AutoFixHigh as AutoFixHighIcon } from "@mui/icons-material";
import { useAgentListStore } from "@src/store";
import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { agentListVisible, storeAgentListVisible } = useAgentListStore();
  const CloseAgentClass = clsx({
    [style["close-agent-app"]]: true,
    [style["app-visible"]]: agentListVisible,
  });
  const handleCloseAgent = () => {
    if (agentListVisible) {
      storeAgentListVisible(false);
    } else {
      storeAgentListVisible(true);
    }
  };
  return (
    <Typography
      component={"div"}
      className={CloseAgentClass}
      onClick={handleCloseAgent}
    >
      <AutoFixHighIcon></AutoFixHighIcon>;
    </Typography>
  );
};

export default memo(Index);

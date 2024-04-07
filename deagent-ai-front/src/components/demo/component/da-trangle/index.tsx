/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import clsx from "clsx";
import { useDemoStore } from "@src/store";
import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { storeIsToogle, isToogle } = useDemoStore();
  const [toggleState, setToggleState] = useState(isToogle);
  const handleToggle = () => {
    setToggleState(() => !toggleState);
    storeIsToogle(!toggleState);
  };
  const trangleClassWrap = clsx({
    defaultIcon: true,
    defaultIconActive: !toggleState,
  });

  return (
    <Typography
      component={"div"}
      className={style["app"]}
      onClick={handleToggle}
    >
      <ChevronRight className={trangleClassWrap} />
    </Typography>
  );
};

export default memo(Index);

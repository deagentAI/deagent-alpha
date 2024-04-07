/**
 * @description 请添加组件描述
 * @author joy
 */
"use client";
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { useIsPc } from "@/hooks";
import { PageIdEnum } from "@src/constants";
import Pc from "./Pc";
import Mobile from "./Mobile";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();

  return (
    <Typography
      component={"div"}
      className={style["app"]}
      id={PageIdEnum.banner}
    >
      {isPc ? <Pc /> : <Mobile />}
    </Typography>
  );
};

export default memo(Index);

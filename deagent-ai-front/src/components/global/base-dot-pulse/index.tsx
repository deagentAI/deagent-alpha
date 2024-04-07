/**
 * @description 加载loading
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  return <span className={style["app"]}></span>;
};

export default memo(Index);

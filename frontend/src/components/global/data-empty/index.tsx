/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import style from "./index.module.scss";

interface Props {
  description?: string;
  className?: string;
}

const Index: React.FC<Props> = (props) => {
  const { description = "no data", className = "" } = props;
  return <p className={`${style["app"]} ${className}`}>{description}</p>;
};

export default memo(Index);

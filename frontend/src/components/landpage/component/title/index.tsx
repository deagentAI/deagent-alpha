/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import style from "./index.module.scss";

interface Props {
  children?: React.ReactNode;
  styles?: any;
  className?: string;
}

const Index: React.FC<Props> = (props) => {
  const { styles = {}, className = "" } = props;
  return (
    <div className={`${style["app"]} ${className}`} {...styles}>
      {props.children}
    </div>
  );
};

export default memo(Index);

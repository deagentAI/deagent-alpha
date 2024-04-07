/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import style from "./Tag.module.scss";
interface Props {
  text: String;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: String;
}

const Tag: React.FC<Props> = (props) => {
  const { text, onClick, className = "" } = props;
  return (
    <Typography
      className={`${style["app"]} ${className}`}
      component={"p"}
      onClick={() => onClick?.()}
    >
      {text}
      {props.children}
    </Typography>
  );
};

export default memo(Tag);

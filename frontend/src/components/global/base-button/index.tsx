/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, ReactNode } from "react";
import { styled, ButtonProps } from "@mui/material";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import style from "./index.module.scss";

interface Props extends LoadingButtonProps {
  children?: ReactNode;
}
const CustomButton = styled(LoadingButton)({
  textTransform: "none",
});
const Index: React.FC<Props & ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <CustomButton className={style["app"]} {...rest}>
      {children}
    </CustomButton>
  );
};

export default memo(Index);

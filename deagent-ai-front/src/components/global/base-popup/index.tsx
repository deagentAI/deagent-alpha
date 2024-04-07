/**
 * @description BasePopup组件
 * @author maicFir
 */
"use client";
import React, { memo, ReactNode } from "react";
import { styled, Popper as BasePopup } from "@mui/material";
import style from "./index.module.scss";

interface Props {
  children?: ReactNode;
  open: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  className?: string;
  container?: any;
  idName?: string;
  placement?: string;
  attrs?: any;
}

const Index: React.FC<Props> = (props) => {
  const {
    open,
    anchorEl,
    onClose,
    className = "",
    container,
    idName = "simple-app",
    attrs,
    ...rest
  } = props;
  const id = open ? idName : undefined;
  const handleClose = () => {
    onClose?.();
  };
  const CustBasePopup: any = styled(BasePopup)({
    ...attrs,
  });

  return (
    <CustBasePopup
      container={container}
      id={id}
      className={`${style["app"]} ${className}`}
      open={open}
      anchorEl={anchorEl}
      {...rest}
    >
      {props?.children}
    </CustBasePopup>
  );
};

export default memo(Index);

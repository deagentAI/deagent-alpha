/**
 * @description 自定义信息框
 * @author maicFir
 */
"use client";
import React, { useState, SyntheticEvent } from "react";
import ReactDom from "react-dom";
import { Snackbar, Alert } from "@mui/material";
import style from "./index.module.scss";

type Props = {
  msg: string;
  type: "success" | "error" | "warning" | "info";
};
const MessageDom: React.FC<Props & { show: boolean; onDestroy: () => void }> = (
  props
) => {
  const { msg, type, show = false, onDestroy } = props;
  const [open, setOpen] = useState(show);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    onDestroy();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} className={style.app}>
        {msg}
      </Alert>
    </Snackbar>
  );
};
export const message = {
  alert: (config: Props) => {
    const div = document.createElement("div");
    div.id = "message-alter";
    document.body.appendChild(div);
    const propsConfig = {
      ...config,
      show: true,
      onDestroy: () => {
        const unmountResult = ReactDom.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
          div.parentNode.removeChild(div);
        }
      },
    };
    return ReactDom.render(React.createElement(MessageDom, propsConfig), div);
  },
};

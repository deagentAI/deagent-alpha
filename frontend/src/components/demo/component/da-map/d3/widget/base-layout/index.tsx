/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import style from "./index.module.scss";

interface Props {
  address?: string;
  bgUrl: string;
  targetUrl: string;
  title: string;
  children?: React.ReactNode;
  cssAttr?: { [key: string]: any };
}

const Index: React.FC<Props> = (props) => {
  const {
    address = "0x33af3c",
    bgUrl,
    targetUrl,
    title,
    children,
    cssAttr,
  } = props;
  return (
    <Typography
      component={"div"}
      className={style["app"]}
      style={{
        background: `url(${bgUrl})`,
        position: "absolute",
        ...cssAttr,
      }}
    >
      <Typography component={"div"} className="app-content">
        <Typography component={"div"} className="app-title">
          <h1>{title}</h1>
          <p>{address}</p>
        </Typography>
        <Typography component={"div"} className="loop-image">
          <Image src={targetUrl} width={200} height={207} alt="" />
        </Typography>
        {children}
      </Typography>
    </Typography>
  );
};

export default memo(Index);

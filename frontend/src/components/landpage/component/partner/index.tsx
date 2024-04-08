/**
 * @description 请添加组件描述
 * @author joy
 */
"use client";
import React, { memo } from "react";
import { Typography, styled } from "@mui/material";
import { PageIdEnum } from "@src/constants";
import Title from "../title";

import { partnerIcon } from "./config";
import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className={style["app"]} id={PageIdEnum.partner}>
      <Title>
        <div className="title">PARTNERSHIP & INVESTOR</div>
      </Title>

      <div className="partner-ai-image">
        {partnerIcon.map((item: any, index: number) => {
          return (
            <div key={index} style={{ backgroundImage: `url(${item.url})` }}>
              {item.text ? <span className="text">{item.text}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Index);

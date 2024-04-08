/**
 * @description 请添加组件描述
 * @author joy
 */
"use client";
import React, { memo } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { BaseButton } from "@src/components/global";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <Typography component={"div"}>
      <div className="wrapper">
        <div className="agent-ai-banner-title">
          <h1 className="agent-ai-banner-title-1">A DECENTRALISED</h1>
          <h1 className="agent-ai-banner-title-2">AI AGENT</h1>
          <h1 className="agent-ai-banner-title-3">NETWORK FOR EVERYONE</h1>
          <BaseButton variant="outlined">DeAgent.AI</BaseButton>
          <div className="agent-ai-banner-sub-title">
            <span>Decentralized</span>
            <span>AI Agent Network</span>
          </div>
        </div>
        <div className="agent-ai-banner-image">
          <Image
            alt=""
            src={"/images/landing-page/banner.png"}
            loading="lazy"
            width={826}
            height={826}
          />
        </div>
      </div>
    </Typography>
  );
};

export default memo(Index);

"use client";
import React, { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { BaseButton } from "@src/components/global";
import Title from "../title";
import { PageIdEnum, PageRouterPathEnum } from "@src/constants";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { push } = useRouter();
  // demo默认不开放
  const [waitDemo, setWaitDemo] = useState(true);
  const handleTryDemo = () => {
    // 暂时禁止
    if (!waitDemo) {
      return;
    }
    push(PageRouterPathEnum.demo);
  };
  return (
    <Typography
      component={"div"}
      className={style["app"]}
      id={PageIdEnum["deagent-ai"]}
    >
      <Title>
        <Typography component={"h1"} className="title">
          <span className="hight-light">DeAgent.ai, </span> YOUR BEST AI
          ASSISTANT IN WEB3
        </Typography>
        <Typography component={"h2"} className="sub-title">
          User Intent Could Be Perfectly Processed By Deagent.ai In Various
          Situations
        </Typography>
      </Title>

      {/* <div className="deAgent-ai-image"> */}
      {/* <img
          alt=""
          src={"/images/landing-page/de_ai.png"}
          width={"100%"}
          height={"535px"}
          loading="lazy"
        /> */}
      <BaseButton className="try-demo" onClick={handleTryDemo} disabled={false}>
        {waitDemo ? "Try our demo now" : "Comming Soon"}
        {`>>`}
      </BaseButton>
      {/* </div> */}
    </Typography>
  );
};

export default memo(Index);

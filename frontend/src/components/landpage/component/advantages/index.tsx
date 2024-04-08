/**
 * @description 请添加组件描述
 * @author joy
 */
"use client";
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { PageIdEnum } from "@src/constants";
import { useIsPc } from "@/hooks";
import Title from "../title";
import Pc from "./Pc";
import Mobile from "./Mobile";

import style from "./index.module.scss";

export const advantages_content = [
  {
    contentBg: "/images/landing-page/advantages_bg1.png",
    contentPhoneImg: "/images/landing-page/advantages_phone_img1.png",
    title: "Enhanced Instrumentality",
    content:
      "DeAgent is spearheading the initiative to enable Large Language Models (LLMs) to utilize tools, transforming LLMs into more effective AI Agents. This is a critical step towards creating truly autonomous AI Agents.",
  },
  {
    contentBg: "/images/landing-page/advantages_bg2.png",
    contentPhoneImg: "/images/landing-page/advantages_phone_img2.png",
    title: "Openness and Decentralization",
    content:
      "DeAgent champions the open and decentralized approach to Agent technology. It's contributing to the global community as a “public good” and stimulating the progress of related projects.",
  },
  {
    contentBg: "/images/landing-page/advantages_bg3.png",
    contentPhoneImg: "/images/landing-page/advantages_phone_img3.png",
    title: "Comprehensive Network and Role Design",
    content:
      "DeAgent has built a network with multiple vital components like a Hybrid Rollup, Agent Registry, QKV, VM, etc. It also provides frameworks for roles like developers and miners, facilitating their effective participation in the network.",
  },
];

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();
  return (
    <Typography
      component={"div"}
      className={style["app"]}
      id={PageIdEnum.advantages}
    >
      <Title>
        <Typography component={"h1"} className="title">
          THE ADVANTAGES OF <span className="hight-light"> DEAGENT.AI</span>
        </Typography>
      </Title>
      {isPc ? <Pc /> : <Mobile />}
    </Typography>
  );
};

export default memo(Index);

"use client";
import React, { memo } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { BaseButton } from "@src/components/global";
import Title from "../title";
import { PageIdEnum, PageRouterPathEnum } from "@src/constants";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { push } = useRouter();
  const handleTryDemo = () => {
    push(PageRouterPathEnum.demo);
  };
  return (
    <Typography component={"div"} id={PageIdEnum["deagent-ai"]}>
      <Title>
        <Typography component={"h1"} className="title">
          <span className="hight-light">DEAGENT.AI</span>
          <span>YOUR BEST AI ASSISTANT IN WEB3</span>
        </Typography>
        <Typography component={"h2"} className="sub-title">
          User Intent Could Be Perfectly Processed By Deagent.ai In Various
          Situations
        </Typography>
      </Title>

      {/* <div className="deAgent-ai-image">
        <img
          alt=""
          src={"/images/landing-page/de_ai.png"}
          width={"100%"}
          height={"535px"}
          loading="lazy"
        />
      </div> */}
      <BaseButton className="try-demo" onClick={handleTryDemo}>
        {"Try our demo now"}
        {`>>`}
      </BaseButton>
    </Typography>
  );
};

export default memo(Index);

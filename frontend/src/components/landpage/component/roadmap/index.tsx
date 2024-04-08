/**
 * @description 请添加组件描述
 * @author joy
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import Title from "../title";
import {
  RoadmapArrowIcon,
  RoadmapUpIcon,
  RoadmapDownIcon,
} from "@comp/global/svg-icon";
import { PageIdEnum } from "@src/constants";
import { useIsPc } from "@/hooks";
import Pc from "./Pc";
import Mobile from "./Mobile";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();

  const readMapData = [
    {
      date: "2023",
      desc: `<div>
       <p>1. Project Initiative </p>
       <p>2.Team Establishment </p>
      </div>`,
    },
    {
      date: "2024Q2",
      desc: `<div>
       <p> 1. AI Terminal Launch </p>
       <p>2. Deagent Protocol Design Launch </p>
       <p>3. Governance token launch</p>
      </div>`,
    },
    {
      date: "2024Q3",
      desc: `<div>
       <p>1. Agent Registry Launch </p>
       <p>2. Dapp Converter SDK Launch</p>
       <p>3. Agent Copilot LLM Beta launch</p>
      </div>`,
    },
    {
      date: "2024Q4",
      desc: `<div>
       <p>1. Agent reranker launch </p>
       <p>2. Deploy Optimistic Agent Network to testnet </p>
       <p>3. Developer Forum Establishment </p>
       <p>4. Whitehat Program Launch </p>
      </div>`,
    },
    {
      date: "2025Q1",
      desc: `<div>
       <p>1. Deploy Optimistic Agent Network mainnet </p>
       <p>2. Agent Copilot LLM Alpha launch </p>
      </div>`,
    },
    {
      date: "2025Q2",
      desc: `<div>
       <p>1. Deploy ZK Agent Network testnet & mainnet</p>
      </div>`,
    },
  ];
  return (
    <Typography
      component={"div"}
      className={style["app"]}
      id={PageIdEnum.roadmap}
      sx={{ margin: "0 auto" }}
    >
      <Title>
        <Typography
          component={"h1"}
          className="title"
          style={{ paddingBottom: "39px" }}
        >
          DEAGENT <span className="hight-light"> ROADMAP</span>
        </Typography>
      </Title>
      {isPc ? <Pc readMapData={readMapData} /> : <Mobile readMapData={readMapData} />}
    </Typography>
  );
};

export default memo(Index);

/**
 * @description landingPage
 * @author joy
 */
"use client";
import React, { memo } from "react";

import { Typography } from "@mui/material";
import Banner from "./component/banner";
import DeagentAi from "./component/deagent-ai";
import Ecosytages from "./component/ecosytages";
import Roadmap from "./component/roadmap";
import Partner from "./component/partner";
import Advantages from "./component/advantages";
import Subscribe from "./component/subscribe";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <Typography component={"div"} className={style["app"]}>
      <Banner />
      <DeagentAi />
      <Advantages />
      <Ecosytages />
      <Roadmap />
      <Partner />
      <Subscribe />
    </Typography>
  );
};

export default memo(Index);

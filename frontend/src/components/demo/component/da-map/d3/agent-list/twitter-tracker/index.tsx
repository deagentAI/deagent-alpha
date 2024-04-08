/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <Typography component={"div"} className={style["app"]}>
      <div className="header">
        <div className="flex items-center">
          <img
            src={"/images/demo/doge.svg"}
            width={"29px"}
            height={"29px"}
            alt=""
          />
          <span className="header-name">Dogecoin</span>
          <span className="header-symbol">@dogecoin</span>
        </div>
        <div className="visit-url">Visit Profile &gt;&gt; </div>
      </div>
      <div className="content">
        Dogecoin is an open source peer-to-peer cryptocurrency, favored by
        shibas worldwide. Elon Musk thinks we&apos;re pretty cool. [RTs are not
        endorsements]
      </div>
      <div className="follow">
        <div className="flex justify-between">
          <span>Follower</span>
          <span>24</span>
        </div>
        <div className="flex justify-between">
          <span>Following</span>
          <span>3.9M</span>
        </div>
      </div>
    </Typography>
  );
};

export default memo(Index);

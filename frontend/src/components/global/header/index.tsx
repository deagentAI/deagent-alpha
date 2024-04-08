/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";

import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { DeagentLogo } from "@comp/global/svg-icon";
import { useIsPc } from "@/hooks";
import PcNav from "./PcNav";
import MobileNav from "./MobileNav";
import { PageRouterPathEnum } from "@src/constants";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const { isPc } = useIsPc();
  const { push } = useRouter();
  const handleToHome = () => {
    push(PageRouterPathEnum.landPage);
  };
  return (
    <header className={style["app"]}>
      <Typography component={"div"} className={"header-main"}>
        <DeagentLogo onClick={handleToHome} className="cursor-pointer" />
        {isPc ? <PcNav /> : <MobileNav />}
      </Typography>
    </header>
  );
};

export default memo(Index);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import { useDemoStore, useVideoStore } from "@src/store";
import { useIsPc } from "@src/hooks";
import { AniGasp } from "@src/utils";
import Demo from "./d3";
import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const { isPc } = useIsPc();
  const { videoVisible } = useVideoStore();
  const { isToogle } = useDemoStore();

  useEffect(() => {
    if (!videoVisible) {
      new AniGasp({ id: ".dagent-app-wrap" }).daMap();
    }
  }, [videoVisible]);

  const wrapClass = clsx({
    [style["app"]]: true,
    "dagent-app-wrap": !videoVisible,
    [style["app-hidden"]]: !isPc ? isToogle : false,
  });
  return (
    <div className={wrapClass}>
      <Demo />
    </div>
  );
};

export default memo(Index);

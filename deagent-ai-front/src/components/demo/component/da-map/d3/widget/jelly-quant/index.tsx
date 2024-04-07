/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";

import { useGetWidgetPos } from "@/components/demo/hooks";
import { DaWidgetComponentName } from "@/constants";
import BaseLayout from "../base-layout";
import style from "./index.module.scss";

interface Props {
  address?: string;
}

const Index: React.FC<Props> = (props) => {
  const { address = "0x33af3c" } = props;
  const cssAttr = useGetWidgetPos(DaWidgetComponentName.jellyQuant) || {};
  const { x, y, ...rest } = cssAttr;
  return (
    <BaseLayout
      bgUrl="/images/demo//onchaindata-bg.png"
      targetUrl="/images/demo/jeffy.png"
      title="JellyQuant"
      cssAttr={{ left: x, top: y, ...rest }}
    >
      <Typography component={"span"} className={style["title-1"]}>
        Crawling data
      </Typography>
      <Typography component={"span"} className={style["title-2"]}>
        Return processed data
      </Typography>
      <Typography component={"span"} className={style["title-3"]}>
        Return row data
      </Typography>
      <Typography component={"span"} className={style["title-4"]}>
        Submit user profile
      </Typography>
    </BaseLayout>
  );
};

export default memo(Index);

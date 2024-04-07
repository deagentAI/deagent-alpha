/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { formatDexTokenPrice, formatNumberChange } from "@src/utils";
import style from "./index.module.scss";
import clsx from "clsx";
interface Props {
  dataItem: any;
}

const Index: React.FC<Partial<Props>> = (props) => {
  const { dataItem = {} } = props;
  const { token_info = "", price_info = {} } = dataItem || {};
  const {
    icon,
    percentChange24h: precent,
    price,
    volume24h: vol,
    symbol,
  } = price_info;
  const increaseRatioClass = clsx({
    [style["spacing"]]: true,
    [style["increase-ratio-down"]]: precent < 0,
    [style["increase-ratio-up"]]: precent > 0,
  });
  return (
    <Typography component={"div"} className={style["app"]}>
      <Typography component={"div"} className={style["app-header"]}>
        <div className="flex">
          <div className={style["icon"]}>
            <img src={icon} width={20} height={20} alt="" />
          </div>
          <div className={style["spacing"]}>{symbol}</div>
        </div>
        <div className="flex">
          <div>
            $
            <span
              dangerouslySetInnerHTML={{ __html: formatDexTokenPrice(price) }}
            ></span>
          </div>
          <div className={increaseRatioClass}>
            {Number(precent).toFixed(2)}%
          </div>
          <div className={style["spacing"]}>24hVol.:</div>
          <div>{formatNumberChange(Number(vol))}</div>
        </div>
      </Typography>
      <Typography component={"div"} className={style["content"]}>
        {token_info}
      </Typography>
    </Typography>
  );
};

export default memo(Index);

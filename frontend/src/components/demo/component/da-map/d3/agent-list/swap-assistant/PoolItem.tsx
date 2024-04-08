/**
 * @description 请添加组件描述
 * @author joy
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { message } from "@/components/global/message";
import { abbreviateAddress, formatNumberChange, copyContent } from "@src/utils";

interface Props {
  item: any;
  children?: React.ReactNode;
}

const formateValue = (key: string, v: any) => {
  if (["pair", "token_address"].includes(key)) {
    return abbreviateAddress(v[key], 5);
  }
  return v[key] || 0;
};

const changeToTwitter = (e: any, url: string) => {
  e.stopPropagation();
  window.open(url, "_bank");
};

// 复制内容
const handleCopyContent = (text: string) => {
  copyContent(text);
  message.alert({
    msg: "copy success!",
    type: "success",
  });
};

const PoolItem: React.FC<Props> = (props) => {
  const { item, children } = props;
  return (
    <Typography component={"div"} className="data-list">
      <div className="data-item">
        <div className="content-item">
          <span className="label">Address({item.symbol})</span>
          <span
            className="underline"
            onClick={() => handleCopyContent(item?.token_address)}
          >
            {formateValue("token_address", item)}
          </span>
        </div>
        <div className="content-item">
          <span className="label">Market Cap</span>
          <span>{formatNumberChange(Number(item.market_cap))}</span>
        </div>
        <div className="content-item">
          <span className="label">Total Supply</span>
          <span>{formatNumberChange(Number(item.total_supply))}</span>
        </div>
        <div className="content-item">
          <span className="label">Twitter</span>
          <span
            className="underline hover:text-[#005696]"
            onClick={(e) => changeToTwitter(e, item.twitter)}
          >
            {item.twitter.slice(-22)}
          </span>
        </div>
      </div>
      <div className="data-item pl-[24px]">
        <div className="content-item">
          <span className="label">Pair</span>
          <span
            className="underline"
            onClick={() => handleCopyContent(item?.pair)}
          >
            {formateValue("pair", item)}
          </span>
        </div>
        <div className="content-item">
          <span className="label">Liq.</span>
          <span>{formatNumberChange(Number(item.liq))}</span>
        </div>
        <div className="content-item">
          <span className="label">Holders</span>
          <span>{formatNumberChange(Number(item.holders))}</span>
        </div>
        <div className="content-item">
          <span className="label">24H Vol.</span>
          <span>{formatNumberChange(Number(item.vol))}</span>
        </div>
      </div>

      {children}
    </Typography>
  );
};

export default memo(PoolItem);

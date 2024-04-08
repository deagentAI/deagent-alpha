import React, { memo } from "react";
import { Typography } from "@mui/material";

interface Props {
  item: any;
  children?: React.ReactNode;
}

const PoolItem: React.FC<Props> = (props) => {
  const { item, children } = props;
  const handleOpenLink = (v: any) => {
    const { url } = v;
    window.open(url, "_blank");
  };
  return (
    <Typography component={"div"} className="grid grid-cols-2 gap-[8px]">
      <div className="content-item">
        <span>Total APY</span>
        <span>{item.apy}</span>
      </div>
      <div className="content-item">
        <span>TVL</span>
        <span>{item.tvl}</span>
      </div>
      <div className="content-item">
        <span>Audit:</span>
        <span>{item.audits}</span>
      </div>
      <div className="content-item">
        <span>Link:</span>
        <span className="underline" onClick={() => handleOpenLink(item)}>
          {item.name}
        </span>
      </div>
      {children}
    </Typography>
  );
};

export default memo(PoolItem);

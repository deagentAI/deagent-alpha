import React, { memo } from "react";
import { Typography } from "@mui/material";
import { SolanaIcon, SolanaNewIcon } from "@comp/global/svg-icon";
import { BaseButton } from "@comp/global";
import { useDemoStore } from "@src/store";
import PoolItem from "./PoolItem";
import style from "./index.module.scss";
interface Props {
  data: any[];
  item: any;
}
const Index: React.FC<Props> = (props) => {
  const { data, item } = props;
  const result = data;
  const { storeSwapParams } = useDemoStore();

  const handleSelectCurrentPool = (v: any) => {
    const {
      token_address,
      market_cap,
      total_supply,
      pair,
      liq,
      holders,
      vol,
      logo,
      price,
      twitter,
      symbol,
      decimals,
    } = v;
    if (!item.swapParams) {
      item.swapParams = {};
    }
    // 将swap组件打开
    item.swapParams.flag = true;
    item.swapParams.vol = vol;
    item.swapParams.token_address = token_address;
    item.swapParams.market_cap = market_cap;
    item.swapParams.total_supply = total_supply;
    item.swapParams.pair = pair;
    item.swapParams.liq = liq;
    item.swapParams.holders = holders;
    item.swapParams.logo = logo;
    item.swapParams.price = price;
    item.swapParams.twitter = twitter;
    item.swapParams.symbol = symbol;
    item.swapParams.decimals = decimals;
    storeSwapParams(item);
    console.log(item, "item123");
    // item.swapParams = {
    //   vol,
    //   token_address,
    //   market_cap,
    //   total_supply,
    //   pair,
    //   liq,
    //   holders,
    // };
  };

  return (
    <Typography component={"div"} className={style["app"]}>
      {result.map((v, index) => (
        <Typography key={index} component={"div"} className="app-content">
          <Typography component={"div"} className="app-title">
            <Typography component={"div"} className="app-head">
              <span className="mr-[8px]">Pool Info of</span>
              <div className="icon-left">
                <img src={v.logo} alt="" width={"18px"} height={"20px"} />
                <div className="icon-right">
                  <SolanaNewIcon />
                </div>
              </div>
              <span className="ml-[18px]">{v.symbol}/SOL</span>
            </Typography>
            <Typography
              component={"div"}
              display={"flex"}
              sx={{ paddingLeft: "15px" }}
            >
              <span className="mx-[8px]">ON</span>
              <SolanaIcon />
              <Typography component={"span"} sx={{ paddingLeft: "5px" }}>
                Raydium(Solana)
              </Typography>
            </Typography>
          </Typography>
          <Typography component={"div"} className={"app-body"}>
            <Typography
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ width: "50%", marginBottom: "12px", marginTop: "12px" }}
              component={"div"}
            >
              <Typography>Pool</Typography>
              <Typography>Raydium</Typography>
            </Typography>
            <Typography component={"div"} className="content">
              <PoolItem item={v} />
              {!item?.swapParams?.flag ? (
                <BaseButton
                  className="choose-button"
                  onClick={() => handleSelectCurrentPool(v)}
                >
                  Choose {v.symbol}/SOL to continue
                </BaseButton>
              ) : null}
            </Typography>
          </Typography>
        </Typography>
      ))}
    </Typography>
  );
};

export default memo(Index);

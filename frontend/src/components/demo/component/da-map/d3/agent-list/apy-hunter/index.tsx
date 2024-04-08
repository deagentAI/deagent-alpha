import React, { memo } from "react";
import { Typography } from "@mui/material";

import { DataEmpty } from "@comp/global";
import { DaWidgetComponentName } from "@/constants";
import { formatNumberChange } from "@src/utils";
import { useGetAgentList } from "@comp/demo/hooks";
import style from "./index.module.scss";

interface Props {}
const Index: React.FC<Props> = (props) => {
  const { agentList } = useGetAgentList(DaWidgetComponentName.ApyHunter);

  return (
    <Typography component={"div"} className={style["app"]}>
      <div className="header">
        <div className="cell cell1">Projects</div>
        <div className="cell">APY</div>
        <div className="cell">TVL</div>
        <div className="cell">Chains</div>
        <div className="cell">Audit</div>
      </div>
      {agentList.length === 0 && (
        <DataEmpty description="No Data" className="empty" />
      )}
      {agentList.length > 0 &&
        agentList.map((v, index) => {
          return (
            <div className="" key={index}>
              {Array.isArray(v.function_respond) &&
                v.function_respond.map((s: any, sindex: number) => {
                  return (
                    <div key={sindex} className="row">
                      <div className="cell cell1">{`${s.name}(${s.symbol})`}</div>
                      <div className="cell">{s.apy}%</div>
                      <div className="cell">{formatNumberChange(s.tvl)}</div>
                      <div className="cell">{s.chain}</div>
                      <div className="cell">{s.audits}</div>
                    </div>
                  );
                })}
              {v.function_respond.length === 0 && (
                <DataEmpty description="No Data" className="empty" />
              )}
            </div>
          );
        })}
    </Typography>
  );
};

export default memo(Index);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";

import { DaWidgetComponentName } from "@src/constants";
import { ArrowDownIcon } from "@comp/global/svg-icon";

import style from "./index.module.scss";
import { useGetAgentList } from "@/components/demo/hooks";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;

  const { agentList } = useGetAgentList(DaWidgetComponentName.jellyQuant);

  return (
    <Typography component={"div"} className={style["app"]}>
      {agentList.map((v, index) => (
        <Typography
          component={"div"}
          key={index}
          className={style["app-content"]}
        >
          {v?.function_respond && (
            <>
              <div className="card">
                <div>If</div>
                <div className="symbol-item mx-[32px]">
                  <img
                    src={"/images/demo/BTC.png"}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span className="ml-[8px]">{v?.function_respond?.token}</span>
                </div>
                <img
                  src={"/images/demo/priceDown.png"}
                  width={15}
                  height={32}
                  alt=""
                />
                <div className="symbol-item ml-[32px]">
                  ${v?.function_respond?.underlying}
                </div>
              </div>
              <div className="arrow">
                <ArrowDownIcon />
              </div>
              <div className="card">
                <div>Then BUY</div>
                <div className="symbol-item mx-[32px]">
                  ${v?.function_respond?.quantity}
                </div>
                <div className="symbol-item">
                  <img
                    src={"/images/demo/BTC.png"}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span className="ml-[8px]">{v?.function_respond?.token}</span>
                </div>
              </div>
            </>
          )}
        </Typography>
      ))}
    </Typography>
  );
};

export default memo(Index);

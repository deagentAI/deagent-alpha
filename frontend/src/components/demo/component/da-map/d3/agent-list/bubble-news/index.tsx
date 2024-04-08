/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useMemo, useContext } from "react";
import { Typography } from "@mui/material";
import { formatDexTokenPrice } from "@src/utils";
import { DaWidgetComponentName } from "@src/constants";
import { useGetAgentList } from "@comp/demo/hooks";
import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const { agentList } = useGetAgentList(DaWidgetComponentName.bubblenews);

  return (
    <Typography component={"div"} className={style["app"]}>
      {agentList.map((v, index) => (
        <Typography
          component={"div"}
          key={index}
          className={style["app-content"]}
        >
          {Array.isArray(v.function_respond) &&
            v.function_respond?.map((v: any, index: number) => {
              return (
                <div key={index} className="break-all">
                  <span
                    dangerouslySetInnerHTML={{ __html: v?.content || v?.title }}
                  ></span>
                  (<span>{v?.symbol || ""}</span>
                  <Typography component={"span"} sx={{ padding: "0 5px" }}>
                    $
                    {(
                      <i
                        dangerouslySetInnerHTML={{
                          __html: formatDexTokenPrice(Number(v.news_price)),
                        }}
                        style={{ fontStyle: "normal" }}
                      ></i>
                    ) || 0}
                    )
                  </Typography>
                </div>
              );
            })}
        </Typography>
      ))}
    </Typography>
  );
};

export default memo(Index);

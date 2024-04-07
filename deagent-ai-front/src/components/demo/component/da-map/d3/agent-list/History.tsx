/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { CoinClatterIcon } from "@comp/global/svg-icon";
import { formatTime } from "@src/utils";

interface Props {
  list: any[];
}

const History: React.FC<Props> = (props) => {
  const { list } = props;
  return (
    <Typography component={"div"} className="history-body">
      <Typography component={"ul"}>
        {list.map((v, index) => (
          <Typography
            key={index}
            component={"li"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography component={"div"}>
              <Typography className="title" component={"h1"}>
                {v.title}
              </Typography>
              <Typography className="date" component={"h2"}>
                {formatTime(v.time)}
              </Typography>
            </Typography>
            <Typography component={"div"}>
              <Typography
                component={"div"}
                display={"flex"}
                position={"relative"}
                className="icon-wrap"
              >
                {new Array(v.agents).fill(1).map((v, index) => (
                  <Typography
                    component={"div"}
                    key={index}
                    className="icon-wrap-inner"
                    style={{ left: `${index * 20}px` }}
                  >
                    <CoinClatterIcon />
                  </Typography>
                ))}
              </Typography>
              <Typography pt={"30px"}>{v.agents}+agents get called</Typography>
            </Typography>
          </Typography>
        ))}
      </Typography>
    </Typography>
  );
};

export default memo(History);

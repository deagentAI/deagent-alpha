import React, { memo } from "react";
import { Typography } from "@mui/material";
import { SolendIcon } from "@comp/global/svg-icon";
import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const data = [
    {
      title: "Total APY",
      key: "",
      value: "",
    },
    {
      title: "TVL",
      key: "",
      value: "",
    },
    {
      title: "Audit",
      key: "",
      value: "",
    },
    {
      title: "Link",
      key: "",
      value: "",
    },
  ];
  return (
    <Typography component={"div"} className={style["app"]}>
      <Typography component={"div"} className={style["app-title"]}>
        <Typography>Pool Info of SOL/USDC</Typography>
        <Typography
          component={"div"}
          display={"flex"}
          sx={{ paddingLeft: "15px" }}
        >
          <Typography sx={{ borderRadius: "100%", overflow: "hidden" }}>
            <SolendIcon />
          </Typography>
          <Typography component={"span"} sx={{ paddingLeft: "5px" }}>
            Solend(Solana)
          </Typography>
        </Typography>
      </Typography>
      <Typography component={"div"} className={style["app-body"]}>
        <Typography
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ width: "50%", paddingLeft: "10px" }}
          component={"div"}
        >
          <Typography>Pool</Typography>
          <Typography>Kamino Liquidity</Typography>
        </Typography>
        <Typography component={"div"} className="content">
          {data.map((v, index) => (
            <Typography component={"div"} key={index} display={"flex"}>
              <Typography className="title" component={"span"}>
                {v.title}
              </Typography>
              <Typography className="value" component={"span"}>
                {v.value || "---"}
              </Typography>
            </Typography>
          ))}
        </Typography>
      </Typography>
    </Typography>
  );
};

export default memo(Index);

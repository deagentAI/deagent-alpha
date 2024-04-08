/**
 * @description 涨幅比
 * @author maicFir
 */
import React, { memo } from "react";
import clsx from "clsx";
import { Typography } from "@mui/material";
import style from "./index.module.scss";

interface Props {
  value: number | string;
  children?: React.ReactNode;
}

const Index: React.FC<Props> = (props) => {
  const { value, children } = props;
  const precenetUpClass = (value: any) =>
    clsx({
      ["percent-value-up"]: Number(value) > 0,
      ["percent-value-down"]: Number(value) <= 0,
    });
  return (
    <Typography component={"div"} className={style["app"]}>
      <div className={`percent-value ${precenetUpClass(value)}`}>
        {value}
        {children}
      </div>
    </Typography>
  );
};

export default memo(Index);

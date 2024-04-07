/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import LoadingIcon from "./Icon";
import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <Typography component={"div"} className={style["app"]}>
      <LoadingIcon />
    </Typography>
  );
};

export default memo(Index);

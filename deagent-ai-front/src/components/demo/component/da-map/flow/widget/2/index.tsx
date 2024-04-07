/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import style from "./index.module.scss";
interface Props {
  isConnectable: boolean;
  data: any;
}

const Index: React.FC<Props> = (props) => {
  const { data, isConnectable } = props;
  return (
    <Typography component="div" className={style["app"]}>
      {data.label}
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </Typography>
  );
};

export default memo(Index);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";

interface Props {}

const LoadDot: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <span className="relative flex h-3 w-3">
      <i
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`}
      ></i>
      <i className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></i>
    </span>
  );
};

export default memo(LoadDot);

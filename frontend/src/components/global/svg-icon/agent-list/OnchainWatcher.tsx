/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const OnchainWatcherIcon: React.FC<IconProps> = (props) => {
  const { width = 14, height = 20, className = "" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 1L1 7V13L13 19" stroke="black" />
      <path d="M1 1L13 7V13L1 19" stroke="black" />
      <path d="M13 7L7 10" stroke="black" />
      <path d="M1 7L7 10" stroke="black" />
      <path d="M7 16V10" stroke="black" />
    </svg>
  );
};

export default memo(OnchainWatcherIcon);

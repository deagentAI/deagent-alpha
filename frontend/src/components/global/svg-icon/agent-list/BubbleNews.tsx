/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const BubbleNewsIcon: React.FC<IconProps> = (props) => {
  const { width = 14, height = 14, className = "" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.1875 0.75H13.4385V3.25H5.1875V0.75Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.1875 5.75H13.4385V8.25H5.1875V5.75Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.1875 10.75H13.4385V13.25H5.1875V10.75Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.0625 0.75H0.5625V3.25H3.0625V0.75Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.0625 5.75H0.5625V8.25H3.0625V5.75Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.0625 10.75H0.5625V13.25H3.0625V10.75Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default memo(BubbleNewsIcon);

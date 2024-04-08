/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const JellyQuantIcon: React.FC<IconProps> = (props) => {
  const { width = 18, height = 18, className = "" } = props;
  return (
    <svg
      width={width}
      className={className}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 16.5H5.5C4.09987 16.5 3.3998 16.5 2.86503 16.2275C2.39462 15.9878 2.01217 15.6054 1.77248 15.135C1.5 14.6002 1.5 13.9002 1.5 12.5V1.5M11.5 2.33333V5.66667M8.16667 5.66667V9M4.83333 9.83333V13.1667M14.8333 2.33333V13.1667"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default memo(JellyQuantIcon);

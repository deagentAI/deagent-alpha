/**
 * @description arrow的icon
 * @author joy
 */
import React, { memo } from "react";
import { IconProps } from "./index";

const DownArrowIcon: React.FC<IconProps> = (props) => {
  const { } = props;
  return (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25593 5.12713C4.85716 5.58759 4.14284 5.58759 3.74407 5.12713L0.73682 1.65465C0.175944 1.00701 0.635997 0 1.49275 0L7.50725 0C8.364 0 8.82406 1.00701 8.26318 1.65465L5.25593 5.12713Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default memo(DownArrowIcon);

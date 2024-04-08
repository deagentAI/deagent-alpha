/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const ReminderIcon: React.FC<IconProps> = (props) => {
  const { width = 20, height = 20, className = "" } = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_25594_5029)">
        <path
          d="M18.75 14.6136L17.5 13.9886V12.5C17.4985 11.6146 17.1841 10.7582 16.6122 10.0823C16.0403 9.40637 15.2479 8.95438 14.375 8.80625V7.5H13.125V8.80625C12.2521 8.95438 11.4597 9.40637 10.8878 10.0823C10.3159 10.7582 10.0015 11.6146 10 12.5V13.9886L8.75 14.6136V17.5H12.5V18.75H15V17.5H18.75V14.6136ZM17.5 16.25H10V15.3864L11.25 14.7614V12.5C11.25 11.837 11.5134 11.2011 11.9822 10.7322C12.4511 10.2634 13.087 10 13.75 10C14.413 10 15.0489 10.2634 15.5178 10.7322C15.9866 11.2011 16.25 11.837 16.25 12.5V14.7614L17.5 15.3864V16.25Z"
          fill="black"
        />
        <path
          d="M17.5 3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5H13.75V1.25H12.5V2.5H7.5V1.25H6.25V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H6.25V16.25H3.75V3.75H6.25V5H7.5V3.75H12.5V5H13.75V3.75H16.25V7.5H17.5V3.75Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_25594_5029">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(ReminderIcon);

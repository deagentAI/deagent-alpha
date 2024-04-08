/**
 * @description DA的 roademap phone line 的icon
 * @author joy
 */
import React from "react";

interface Props {}
const RoadmapLineIcon: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="18.5"
      height="1"
      viewBox="0 0 18.5 1"
    >
      <g transform="matrix(0,-1,1,0,0,1)">
        <path
          d="M0,0.5L0,1.59375L1,1.59375L1,0.5L0,0.5ZM0,3.78125L0,5.96875L1,5.96875L1,3.78125L0,3.78125ZM0,8.15625L0,10.34375L1,10.34375L1,8.15625L0,8.15625ZM0,12.5312L0,14.7188L1,14.7188L1,12.5312L0,12.5312ZM0,16.9062L0,18L1,18L1,16.9062L0,16.9062Z"
          fill-rule="evenodd"
          fill="#01FD96"
          fillOpacity="1"
        />
      </g>
    </svg>
  );
};

export default RoadmapLineIcon;

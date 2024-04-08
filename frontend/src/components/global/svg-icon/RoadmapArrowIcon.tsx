/**
 * @description DA的 roademap arrow 的icon
 * @author joy
 */
import React from "react";

interface Props {}
const RoadmapArrowIcon: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="41"
      height="49"
      viewBox="0 0 41 49"
    >
      <g>
        <path
          d="M6.00344,34.6472C-2.00114,26.7407,-2.00114,13.8524,6.00344,5.94578C14.009,-1.98193,26.99,-1.98193,34.9955,5.94578C43.0015,13.8526,43.0015,26.7425,34.9955,34.6493L20.4995,49L6.00344,34.6472ZM20.4995,26.5419C23.8973,26.5436,26.6527,23.8008,26.6527,20.417C26.6527,17.0331,23.8973,14.2904,20.4995,14.292C17.104,14.2937,14.3523,17.0354,14.3523,20.417C14.3523,23.7985,17.104,26.5403,20.4995,26.5419Z"
          fill="#01FD96"
          fillOpacity="1"
        />
      </g>
    </svg>
  );
};

export default RoadmapArrowIcon;

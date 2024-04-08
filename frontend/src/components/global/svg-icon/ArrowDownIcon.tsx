/**
 * @description 向下的 arrow 的icon
 * @author joy
 */
import React from "react";

interface Props {}
const ArrowDownIcon: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <svg
      width="15"
      height="32"
      viewBox="0 0 15 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.79289 31.7154C7.18342 32.1059 7.81658 32.1059 8.20711 31.7154L14.5711 25.3515C14.9616 24.9609 14.9616 24.3278 14.5711 23.9372C14.1805 23.5467 13.5474 23.5467 13.1569 23.9372L7.5 29.5941L1.84315 23.9372C1.45262 23.5467 0.819457 23.5467 0.428932 23.9372C0.0384078 24.3278 0.0384078 24.9609 0.428932 25.3515L6.79289 31.7154ZM6.5 -0.0078125L6.5 31.0083H8.5V-0.0078125L6.5 -0.0078125Z"
        fill="#05F988"
      />
    </svg>
  );
};

export default ArrowDownIcon;

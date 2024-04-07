/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const StakeAgentIcon: React.FC<IconProps> = (props) => {
  const { className = "", width = 20, height = 18 } = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0163 0H4.35966L0 7.25285L9.68798 18L19.376 7.25285L15.0163 0ZM2.00003 7.05991L5.27291 1.61481H14.103L17.3762 7.05991L9.68798 15.5885L2.00003 7.05991Z"
        fill="black"
      />
      <path
        d="M11.5357 4.20703L9.692 6.0512L7.84827 4.20703L6.99219 5.06333L8.41936 6.49072H7.21294V7.70156H9.08647V8.48413H7.26857V9.69518H9.08647V11.4522H10.2975V9.69518H12.1161V8.48413H10.2975V7.70156H12.1713V6.49072H10.9646L12.392 5.06333L11.5357 4.20703Z"
        fill="black"
      />
    </svg>
  );
};

export default memo(StakeAgentIcon);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { IconProps } from "../index";

const SwapAssistantIcon: React.FC<IconProps> = (props) => {
  const { width = 18, height = 18, className = "" } = props;
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.668802 16.4673V12.3007C0.668802 12.0118 0.768802 11.7673 0.968802 11.5673C1.1688 11.3673 1.4188 11.2618 1.7188 11.2507H5.88547C6.16325 11.2507 6.40769 11.3562 6.6188 11.5673C6.82991 11.7784 6.92991 12.0229 6.9188 12.3007V16.4673C6.9188 16.7562 6.8188 17.0007 6.6188 17.2007C6.4188 17.4007 6.17436 17.5007 5.88547 17.5007H1.7188C1.42991 17.5007 1.17991 17.4007 0.968802 17.2007C0.757691 17.0007 0.657691 16.7562 0.668802 16.4673ZM0.685469 6.23398C0.652135 6.02287 0.674358 5.82287 0.752135 5.63398C0.829913 5.4451 0.952135 5.2951 1.1188 5.18398C1.28547 5.07287 1.48547 5.01176 1.7188 5.00065H2.75214C2.75214 4.1451 3.05769 3.41176 3.6688 2.80065C4.27991 2.18954 5.0188 1.88398 5.88547 1.88398H7.9688C8.21325 1.88398 8.42436 1.95621 8.60214 2.10065C8.77991 2.2451 8.89102 2.41732 8.93547 2.61732C8.97991 2.81732 8.97991 3.02287 8.93547 3.23398C8.89102 3.4451 8.77991 3.61732 8.60214 3.75065C8.42436 3.88398 8.21325 3.95621 7.9688 3.96732H5.88547C5.59658 3.96732 5.34658 4.06732 5.13547 4.26732C4.92436 4.46732 4.82436 4.71176 4.83547 5.00065H5.88547C6.10769 5.00065 6.30769 5.06732 6.48547 5.20065C6.66325 5.33398 6.78547 5.48398 6.85214 5.65065C6.9188 5.81732 6.93547 6.01176 6.90214 6.23398C6.8688 6.45621 6.77436 6.63954 6.6188 6.78398L4.53547 8.86732C4.31325 9.07843 4.06325 9.18398 3.78547 9.18398C3.50769 9.18398 3.2688 9.07843 3.0688 8.86732L0.985469 6.78398C0.818802 6.62843 0.718802 6.4451 0.685469 6.23398ZM2.75214 15.4173H4.83547V13.334H2.75214V15.4173ZM9.0688 15.734C9.03547 15.5229 9.03547 15.3173 9.0688 15.1173C9.10214 14.9173 9.21325 14.7451 9.40214 14.6006C9.59103 14.4562 9.80769 14.384 10.0521 14.384H12.1355C12.4132 14.384 12.6577 14.284 12.8688 14.084C13.0799 13.884 13.1799 13.634 13.1688 13.334H12.1355C11.9021 13.334 11.6966 13.2729 11.5188 13.1507C11.341 13.0284 11.2188 12.8729 11.1521 12.684C11.0855 12.4951 11.0688 12.3007 11.1021 12.1007C11.1355 11.9007 11.2355 11.7229 11.4021 11.5673L13.4855 9.48398C13.6966 9.27287 13.941 9.16732 14.2188 9.16732C14.4966 9.16732 14.741 9.26732 14.9521 9.46732L17.0355 11.5507C17.2021 11.7173 17.3021 11.9062 17.3355 12.1173C17.3688 12.3284 17.341 12.5229 17.2521 12.7007C17.1632 12.8784 17.041 13.0284 16.8855 13.1507C16.7299 13.2729 16.5355 13.334 16.3021 13.334H15.2521C15.2521 14.2007 14.9466 14.9395 14.3355 15.5507C13.7244 16.1618 12.991 16.4673 12.1355 16.4673H10.0521C9.79658 16.4673 9.57991 16.3951 9.40214 16.2507C9.22436 16.1062 9.11325 15.934 9.0688 15.734ZM11.0855 6.05065V1.88398C11.0855 1.5951 11.1855 1.35065 11.3855 1.15065C11.5855 0.950651 11.8355 0.845095 12.1355 0.833984H16.3021C16.5799 0.833984 16.8244 0.93954 17.0355 1.15065C17.2466 1.36176 17.3466 1.60621 17.3355 1.88398V6.05065C17.3355 6.33954 17.2355 6.58398 17.0355 6.78398C16.8355 6.98398 16.591 7.08398 16.3021 7.08398H12.1355C11.8466 7.08398 11.5966 6.98398 11.3855 6.78398C11.1744 6.58398 11.0744 6.33954 11.0855 6.05065ZM13.1688 5.00065H15.2521V2.91732H13.1688V5.00065Z"
        fill="black"
      />
    </svg>
  );
};

export default memo(SwapAssistantIcon);
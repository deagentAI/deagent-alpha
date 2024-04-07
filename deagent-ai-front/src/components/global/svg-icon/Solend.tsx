/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";

import { IconProps } from "./index";

const SolendIcon: React.FC<IconProps> = (props) => {
  const { width = 18, height = 20 } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="0.5" width="17.3333" height="20" fill="url(#pattern012)" />
      <defs>
        <pattern
          id="pattern012"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_24903_5501"
            transform="matrix(0.0240385 0 0 0.0208333 -0.0769231 0)"
          />
        </pattern>
        <image
          id="image0_24903_5501"
          width="48"
          height="48"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default memo(SolendIcon);

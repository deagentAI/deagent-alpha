/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { advantages_content } from "./index";
interface Props {}

const Pc: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="advantages-content">
    {/* <div className="advantages-point left"></div> */}
    <div className="advantages-center">
      {advantages_content.map((item, index) => {
        return (
          <div
            key={index}
            className="advantages-card"
            style={{ backgroundImage: `url(${item.contentBg})` }}
          >
            <Typography component={"h3"} className="ai-title">
              {item.title}
            </Typography>
            <Typography component={"h4"} className="ai-content">
              {item.content}
            </Typography>
          </div>
        );
      })}
    </div>
    {/* <div className="advantages-point-right right"></div> */}
  </div>
    
  );
};

export default memo(Pc);

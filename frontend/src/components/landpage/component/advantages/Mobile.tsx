/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { advantages_content } from "./index";
import "swiper/css";
interface Props {}

const Pc: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="advantages-center">
      {advantages_content.map((item, index) => {
        return (
          <div
            key={index}
            className="advantages-card-phone"
            // style={{ backgroundImage: `url("/images/landing-page/advantages_phone_bg.png")` }}
          >
            <div
            className="phone-img"
            style={{ backgroundImage: `url(${item.contentPhoneImg})` }}
            >
            </div>
            <Typography component={"div"} className="ai-right">
              <Typography component={"p"} className="ai-title">
                {item.title}
              </Typography>
              <Typography component={"p"} className="ai-content">
                {item.content}
              </Typography>
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Pc);

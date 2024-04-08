/**
 * @description 请添加组件描述
 * @author joy
 */
import React, { memo, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import { PageIdEnum } from "@src/constants";
import { useIsPc } from "@src/hooks";
import Title from "../title";
import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();
  const [imageStyle, setImageStyle] = useState({
    width: 1083,
    height: 872,
  });
  useEffect(() => {
    if (!isPc) {
      setImageStyle({
        width: imageStyle.width / 2,
        height: imageStyle.height / 2,
      });
    }
  }, [isPc]);
  return (
    <Typography
      component={"div"}
      className={style["app"]}
      id={PageIdEnum.ecosytages}
    >
      <Title>
        <Typography component={"h1"} className="title">
          DEAGENT <span className="hight-light"> ECOSYSTEM</span>
        </Typography>
      </Title>

      <div className="deAgent-ai-image">
        <Image
          alt=""
          src={"/images/landing-page/ecosystem.png"}
          width={imageStyle.width}
          height={imageStyle.height}
          loading="lazy"
        />
      </div>
    </Typography>
  );
};

export default memo(Index);

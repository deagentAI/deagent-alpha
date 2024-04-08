/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";

import React, { memo, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { useScrollToView } from "@src/hooks";
import { PageRouterPathEnum, PageIdEnum } from "@src/constants";

import { routerConfig } from "./routerConfig";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const { handleToTargetView } = useScrollToView();
  const { push } = useRouter();
  const route = usePathname();
  const [pageId, setPageId] = useState<any[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>(PageIdEnum.banner);
  const handleScrollTo = (idName: string) => {
    const elDom = {
      [idName]: document.getElementById(idName),
    };

    if (elDom[idName]) {
      handleToTargetView(elDom[idName]);
      setActiveStatus(idName);
    } else {
      if (route === PageRouterPathEnum.demo) {
        push(PageRouterPathEnum.landPage);
      }
    }
  };
  // useEffect(() => {
  //   setPageId(routerConfig.map((v) => document.getElementById(v.idName)));
  // }, []);
  // useEffect(() => {
  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       // console.log(entries[0]);
  //       // if (entries[0].intersectionRatio <= 0) {
  //       //   setActiveStatus("");
  //       // } else {
  //       //   setActiveStatus(entries[0].target.id);
  //       // }
  //     },
  //     {
  //       threshold: [0.2],
  //     }
  //   );
  //   if (pageId.length > 0) {
  //     pageId.forEach((el) => {
  //       io.observe(el);
  //     });
  //   }
  // }, [pageId]);
  useEffect(() => {
    if (route === PageRouterPathEnum.demo) {
      setActiveStatus(PageIdEnum["deagent-ai"]);
    }
  }, [route]);
  const routerClassWrap = (idName: string) => {
    return clsx({
      active: idName === activeStatus,
    });
  };

  return (
    <Typography component={"div"} className="header-right pc-nav">
      {routerConfig.map((v, index) => {
        return (
          <Typography
            key={index}
            component={"div"}
            className={routerClassWrap(v.idName)}
            onClick={() => {
              handleScrollTo(v.idName);
            }}
          >
            {v.text}
          </Typography>
        );
      })}
    </Typography>
  );
};

export default memo(Index);

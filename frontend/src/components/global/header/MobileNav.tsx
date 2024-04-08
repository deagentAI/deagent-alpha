/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useRef, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useScrollToView, useIsPc } from "@src/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Popper } from "@mui/material";
import { routerConfig } from "./routerConfig";

interface Props {}

const MobileNav: React.FC<Props> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();
  const wrapElem = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleToTargetView } = useScrollToView();
  const [activeStatus, setActiveStatus] = useState<string>("");
  const handleScrollTo = (idName: string) => {
    const elDom = {
      [idName]: document.getElementById(idName),
    };
    if (elDom[idName]) {
      handleToTargetView(elDom[idName]);
    }
    setActiveStatus(idName);
  };
  const routerClassWrap = (idName: string) => {
    return clsx({
      active: idName === activeStatus,
    });
  };

  const handleClick = (event: any) => {
    console.log(event);
    setAnchorEl(anchorEl ? null : event.target);
    event.stopPropagation();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  useEffect(() => {
    const bodyDom = document.getElementsByTagName("body")[0];
    if (anchorEl) {
      bodyDom.addEventListener("click", handleClick);
    }

    return () => {
      bodyDom.removeEventListener("click", handleClick);
    };
  }, [anchorEl]);
  return (
    <div className="header-right" ref={wrapElem}>
      {isPc ? (
        <MenuIcon onClick={(e) => handleClick(e)} sx={{ color: "#fff" }} />
      ) : null}
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        container={() => wrapElem.current}
      >
        <Typography component={"div"} className="mobile-nav">
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
      </Popper>
    </div>
  );
};

export default memo(MobileNav);

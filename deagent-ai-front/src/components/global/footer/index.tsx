/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  DeagentLogo,
  FooterDiscordIcon,
  FooterEmailIcon,
  FooterFacebookIcon,
  FooterInsIcon,
  FooterTgIcon,
  FooterTwitterIcon,
  FooterYoutubeIcon,
} from "@comp/global/svg-icon";
import { PageRouterPathEnum } from "@src/constants";

import style from "./index.module.scss";
interface Props {}

type socialLinkConfigType = {
  icon: React.ReactNode;
  ariaLabel: string;
  link?: string;
};

const socialLinkConfig: socialLinkConfigType[] = [
  {
    icon: <FooterDiscordIcon />,
    ariaLabel: "discord",
    link: "https://discord.com/invite/4Yc3cCS2",
  },
  {
    icon: <FooterTwitterIcon />,
    ariaLabel: "twitter",
    link: "https://twitter.com/Deagent_AI",
  },
  {
    icon: <FooterEmailIcon />,
    ariaLabel: "email",
  },
  {
    icon: <FooterYoutubeIcon />,
    ariaLabel: "youtube",
    link: "https://www.youtube.com/channel/UCXG_jYEdgkvWSJYyR8lXroQ",
  },
  {
    icon: <FooterTgIcon />,
    ariaLabel: "tg",
    link: "https://www.youtube.com/channel/UCXG_jYEdgkvWSJYyR8lXroQ",
  },
  {
    icon: <FooterInsIcon />,
    ariaLabel: "ins",
    link: "https://www.instagram.com/deagent.ai/",
  },
];
const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { push } = useRouter();
  const handleToSocialLink = ({ link, ariaLabel }: socialLinkConfigType) => {
    if (link) {
      window.open(link, "_blank");
    }
    if (ariaLabel === "email") {
      window.location.href = "mailto:developer@deagent.ai";
    }
  };
  const handleToHome = () => {
    push(PageRouterPathEnum.landPage);
  };
  return (
    <footer className={style["footer"]}>
      <Typography component={"div"} className="footer-main">
        <Typography component={"div"}>
          <DeagentLogo className="cursor-pointer" onClick={handleToHome} />
        </Typography>
        <Typography component={"div"} className="icon">
          {socialLinkConfig.map((v, index) => {
            return (
              <span
                aria-label={v.ariaLabel}
                key={index}
                onClick={() => handleToSocialLink(v)}
              >
                {v.icon}
              </span>
            );
          })}
        </Typography>
      </Typography>
    </footer>
  );
};

export default memo(Index);

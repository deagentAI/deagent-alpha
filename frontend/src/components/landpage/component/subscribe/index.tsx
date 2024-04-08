"use client";

import React, { memo, useState, useRef } from "react";
import { Typography, Input } from "@mui/material";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import CancelIcon from "@mui/icons-material/Cancel";
import { DaIcon, SubscribeInputIcon } from "@comp/global/svg-icon";
import { postSubscribeApi } from "@src/services/api";
import { message } from "@/components/global/message";
import { useIsPc } from "@/hooks";
import Title from "../title";

import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { isPc } = useIsPc();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSaveEmail = async () => {
    if (!email) {
      setError("Please enter your email");
      inputRef.current?.getElementsByTagName("input")[0]?.focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setLoading(true);
      try {
        await postSubscribeApi(email);
        message.alert({
          msg: "subscribe success!",
          type: "success",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }

      setEmail("");
    } else {
      setLoading(false);
      setError("Please enter a valid email");
    }
  };

  const onChangeEmail = (event: any) => {
    const value = event.target.value;
    if (value) {
      setError("");
    }
    setEmail(value);
  };
  const handleClearInput = () => {
    setEmail("");
  };

  return (
    <div className={style["app"]}>
      <Typography component={"div"} className="wrapper">
        <div className="agent-ai-banner-title">
          {isPc ? (
            <div className="da-logo">
              <DaIcon />
            </div>
          ) : null}
          <Title className="subscribe-title">
            <h1 className="title agent-ai-banner-title-1">
              AI WILL CHANGE THE WORLD
            </h1>
            <h1 className="title agent-ai-banner-title-2">AND DEAGENT.AI</h1>
            <h1 className="title agent-ai-banner-title-3">
              WILL BOOST THE PROCESS
            </h1>
          </Title>
          <div className="subscribe-form">
            <Input
              className="deagent-input"
              placeholder={`${
                isPc ? "Input Your Email To Subscribe" : "Your Email Address"
              }`}
              value={email}
              onChange={onChangeEmail}
              ref={inputRef}
            />
            {email && (
              <CancelIcon className="close-btn" onClick={handleClearInput} />
            )}

            <LoadingButton
              variant="outlined"
              onClick={handleSaveEmail}
              loading={loading}
              disabled={loading}
            >
              <div className="subscribe-button">
                <SubscribeInputIcon />
                <div className="ml-[4px]">Subscribe</div>
              </div>
            </LoadingButton>
          </div>
          {error && <div className="email-error">{error}</div>}
          {isPc ? (
            <div className="agent-ai-banner-sub-title">
              <span>Decentralized</span>
              <span>AI Agent Network</span>
            </div>
          ) : null}
        </div>
        <div className="agent-ai-banner-image">
          <Image
            src={"/images/landing-page/system_footer.png"}
            width={isPc ? 901 : 450.5}
            height={isPc ? 851 : 425}
            alt=""
          />
          {/* <img
            alt=""
            src={"/images/landing-page/system_footer.png"}
            width={"100%"}
            height={"auto"}
            loading="lazy"
          /> */}
        </div>
      </Typography>
    </div>
  );
};

export default memo(Index);

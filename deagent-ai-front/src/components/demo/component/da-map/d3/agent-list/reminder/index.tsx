/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useState, useEffect } from "react";
import { Typography, Input, CircularProgress } from "@mui/material";
import { guid, isEmail } from "@/utils";
import { message } from "@comp/global";
import { DaWidgetComponentName } from "@/constants";
import style from "./index.module.scss";
import { useGetAgentList } from "@/components/demo/hooks";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;

  const [step1State, setStep1State] = useState("loading");
  const [step2State, setStep2State] = useState("default");
  const [step3State, setStep3State] = useState("default");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [submitFlag, setSubmitFlag] = useState(true);
  const [loadingState, setLoadingState] = useState(false);

  const { agentList } = useGetAgentList(DaWidgetComponentName.reminder);
  let timerId: any = null;

  const onChangeInputTrack = (event: any, v: any) => {
    const value = event.target.value;
    v.tracking = value;
    setInput1(value);
  };

  const onChangeInputEmail = (event: any, v: any) => {
    const value = event.target.value;

    setInput2(value);
    v.email = value;
  };

  const onChangeInputKeyWord = (event: any, v: any) => {
    const value = event.target.value;
    v.keyword = value;
    setInput3(value);
  };

  const handleConfirm1 = () => {
    if (!input1) {
      message.alert({
        type: "warning",
        msg: "account is required",
      });
      return;
    }
    setLoadingState(true);
    timerId = setTimeout(() => {
      setStep1State("success");
      setStep2State("loading");
      setLoadingState(false);
    }, 800);
  };

  const handleConfirm2 = () => {
    if (!input2) {
      message.alert({
        type: "warning",
        msg: "email address is required.",
      });
      return;
    }
    if (!isEmail(input2)) {
      message.alert({
        type: "warning",
        msg: "Please enter a valid email address.",
      });
      return;
    }
    setLoadingState(true);
    timerId = setTimeout(() => {
      setStep2State("success");
      setStep3State("loading");
      setLoadingState(false);
    }, 800);
  };

  const handleConfirm3 = () => {
    if (!input3) {
      message.alert({
        type: "warning",
        msg: "keyword is required",
      });
      return;
    }
    setLoadingState(true);
    timerId = setTimeout(() => {
      setStep3State("success");
      setLoadingState(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleSubmit = (v: any) => {
    setSubmitFlag(false);
    v.reminderFlag = true;
    v.reminder.email = v.email;
    v.reminder.keyword = v.keyword;
    v.reminder.reminderFlag = v.reminderFlag;
    v.reminder.tracking = v.tracking;
    v.keyUid = guid();
  };

  return (
    <Typography component={"div"} className={style["app"]}>
      {agentList.map((v: any, index) => {
        return (
          <div className="app-content" key={index}>
            {step1State === "loading" ? (
              <div className="step step1-loading">
                <div className="title">1. Set up tracking target</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Input
                      className="step1-input"
                      placeholder="input x account to track..."
                      onChange={(e) => onChangeInputTrack(e, v)}
                      type="text"
                      inputProps={{
                        maxLength: 50,
                      }}
                      value={v.tracking}
                    />
                    <img
                      src={"/images/demo/user.png"}
                      width={28}
                      height={28}
                      alt=""
                    />
                    <div className="flex flex-col items-center mx-[8px]">
                      <span className="">--</span>
                      <span className="text-[#666]">@--</span>
                    </div>
                  </div>
                  {loadingState ? (
                    <div className="confirm">
                      <CircularProgress size={24} />
                    </div>
                  ) : (
                    <div className="confirm" onClick={handleConfirm1}>
                      Confirm
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="step1-success">
                <span className="title w-[200px]">
                  1. Set up tracking target
                </span>
                <img
                  src={"/images/demo/success.png"}
                  width={16}
                  height={16}
                  alt=""
                  style={{ marginRight: "8px" }}
                />
                <img
                  src={"/images/demo/doge.svg"}
                  width={28}
                  height={28}
                  alt=""
                />
                <span className="ml-[20px]">{input1 || v.tracking}</span>
                <span className="email-text ml-[2px]">
                  @{input1 || v.tracking}
                </span>
              </div>
            )}
            {step2State === "loading" ? (
              <div className="step step1-loading">
                <div className="title mb-[8px]">2. Set up receive channel</div>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <Input
                      className="step1-input"
                      placeholder="Input email or tg to receive..."
                      onChange={(e) => onChangeInputEmail(e, v)}
                      type="text"
                      inputProps={{
                        maxLength: 50,
                      }}
                      value={v.email}
                    />
                    <img
                      src={"/images/demo/gmail.png"}
                      width={28}
                      height={28}
                      alt=""
                    />
                    <div className="mx-[8px]">Email</div>
                  </div>
                  {loadingState ? (
                    <div className="confirm">
                      <CircularProgress size={24} />
                    </div>
                  ) : (
                    <div className="confirm" onClick={handleConfirm2}>
                      Confirm
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="step step2-success">
                <span className="title w-[200px]">2. Set receive channel</span>
                {step2State === "success" ? (
                  <img
                    src={"/images/demo/success.png"}
                    width={"16px"}
                    height={"16px"}
                    alt=""
                    style={{ marginRight: "8px" }}
                  />
                ) : null}
                <img
                  src={"/images/demo/gmail.png"}
                  width={"28px"}
                  height={"28px"}
                  alt=""
                />
                <span
                  className={`${
                    input2 ? "title ml-[20px]" : "email-text ml-[20px]"
                  }`}
                >
                  {input2 ? `${input2}` : "input your email"}
                </span>
              </div>
            )}
            {step3State === "loading" ? (
              <div className="step step1-loading">
                <div className="title mb-[8px]">3. Set tracking keyword</div>
                <div className="flex justify-between">
                  <Input
                    className="step1-input"
                    placeholder="Input keyword to track..."
                    onChange={(e) => onChangeInputKeyWord(e, v)}
                    type="text"
                    inputProps={{
                      maxLength: 50,
                    }}
                    value={v.keyword}
                  />
                  {loadingState ? (
                    <div className="confirm">
                      <CircularProgress size={24} />
                    </div>
                  ) : (
                    <div className="confirm" onClick={handleConfirm3}>
                      Confirm
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="step step2-success">
                <span className="title w-[200px]">3. Set tracking keyword</span>
                {step3State === "success" ? (
                  <img
                    src={"/images/demo/success.png"}
                    width={"16px"}
                    height={"16px"}
                    alt=""
                    style={{ marginRight: "8px" }}
                  />
                ) : null}
                <span
                  className={`${
                    input3 ? "title ml-[42px]" : "email-text ml-[20px]"
                  }`}
                >
                  {input3 ? `"${input3}"` : "input your keyword"}
                </span>
              </div>
            )}
            {step1State === "success" &&
            step2State === "success" &&
            step3State === "success" ? (
              <>
                {submitFlag ? (
                  <div
                    className="submit-button"
                    onClick={() => handleSubmit(v)}
                  >
                    Submit to start tracking
                  </div>
                ) : (
                  <div className="notice">
                    Notice: Deagent reminder is still under developing, the real
                    notification would not send to your receive email or
                    telegram
                  </div>
                )}
              </>
            ) : null}
          </div>
        );
      })}
    </Typography>
  );
};

export default memo(Index);

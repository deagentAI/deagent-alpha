/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { BaseTypeText } from "@comp/global";
import style from "./QuestionComp.module.scss";
interface Props {
  value?: any;
  typeing?: boolean;
  placement?: string;
  children?: React.ReactNode;
  className?: string;
}

const QuestionComp: React.FC<Props> = (props) => {
  const {
    value,
    typeing = false,
    placement = "left",
    children,
    className = "",
  } = props;
  return (
    <div className={`${style["question-wrap"]} ${className}`}>
      {typeing ? (
        <div className={style["question"]}>
          <BaseTypeText data={value} />
        </div>
      ) : (
        <div className={`${style["question"]} ${placement}`}>
          {children}
          <div className="question-value">{value}</div>
        </div>
      )}
    </div>
  );
};

export default memo(QuestionComp);

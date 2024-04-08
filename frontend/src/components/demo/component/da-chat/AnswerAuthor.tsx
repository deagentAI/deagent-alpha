/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import Image from "next/image";
import style from "./AnswerAuthor.module.scss";
interface Props {
  name?: string;
  icon?: any;
}

const AnswerAuthor: React.FC<Props> = (props) => {
  const { name = "Deagent.ai", icon } = props;
  return (
    <div className={style["app"]}>
      <div>
        {icon && icon}
        {!icon && (
          <Image width={20} height={20} src={"/images/logo/logo.png"} alt="" />
        )}
      </div>
      <span>{name}:</span>
    </div>
  );
};

export default memo(AnswerAuthor);

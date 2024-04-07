import React, { memo } from "react";
import Typist from "react-typist-component";
type TypeTextProps = {
  data: string | any;
  typingDelay?: number;
  className?: string;
};

const TypeText: React.FC<TypeTextProps> = (props) => {
  const { data, typingDelay = 30, className = "" } = props;

  return (
    <Typist typingDelay={typingDelay}>
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: data.toString() }}
      ></div>
    </Typist>
  );
};
export default memo(TypeText);

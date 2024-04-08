/**
 * @description 错误边界组件，防止组件因内部代码错误白屏，优化组件显示
 * @author imclock
 */
import React, { memo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import style from "./index.module.scss";
interface Props {
  children: React.ReactNode;
}
function Fallback({ error }: any) {
  return (
    <div role="alert" className={style["alert"]}>
      <pre>{error.message}</pre>
    </div>
  );
}
const WithErrorBoundary: React.FC<Props> = (props) => {
  const logError: any = (
    error: Error,
    info: { componentStack: string }
  ): void => {
    console.log(error);
  };
  const {} = props;
  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      {props.children}
    </ErrorBoundary>
  );
};

export default memo(WithErrorBoundary);

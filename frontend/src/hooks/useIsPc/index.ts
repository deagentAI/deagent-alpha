import { useState, useEffect } from "react";
import { isMobile } from "@/utils";
/**
 *
 * @returns 判断客户端是否是pc显示还是phone显示
 */
export const useIsPc = () => {
  // 默认就是PC
  const [isPc, setIsPc] = useState(true);
  useEffect(() => {
    if (isMobile()) {
      setIsPc(false);
    }
    const handleSetPc = () => {
      if (isMobile()) {
        setIsPc(false);
      } else {
        setIsPc(true);
      }
    };
    window.addEventListener("resize", handleSetPc);
    return () => {
      window.removeEventListener("resize", handleSetPc);
    };
  }, []);
  return {
    isPc,
  };
};

import { useEffect, useRef } from "react";
export const useChatScrollToBottom = () => {
  let dom = useRef<any>(null);
  let timerId: any = null;
  const handleToScroll = () => {
    if (dom.current) {
      timerId = setTimeout(() => {
        dom.current.scrollTop = dom.current.scrollHeight;
      }, 800);
    }
  };
  useEffect(() => {
    dom.current = document.getElementById("deagent-chat-room");
    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return {
    handleToScroll,
  };
};

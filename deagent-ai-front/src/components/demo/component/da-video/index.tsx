/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useEffect, useRef } from "react";
import { useVideoStore } from "@src/store";
import style from "./index.module.scss";
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { storeVideoVisible } = useVideoStore();
  const videoRef = useRef<any>(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => {
        storeVideoVisible(false);
      };
      videoElement.addEventListener("ended", handleVideoEnd);
      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, []);
  return (
    <video
      autoPlay
      muted
      ref={videoRef}
      className={style["app"]}
      preload="metadata"
    >
      <source src="/images/demo/bg-demo.mp4" type="video/mp4" />
    </video>
  );
};

export default memo(Index);

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useRef } from "react";
import DaMap from "./svg-map";
import AgentList from "./agent-list";
import CloseAgent from "./close-agent";
import OnchainData from "./widget/onchaindata";
import SwapAssistant from "./widget/swap-assistant";
import ApyHunter from "./widget/apy-hunter";
import Coinpedia from "./widget/coinpedia";
import JellyQuant from "./widget/jelly-quant";
import Bubblenews from "./widget/bubblenews";

import style from "./index.module.scss";

interface Props {}

const Index: React.FC<Props> = (props) => {
  const containerRef = useRef<any>(null);

  return (
    <div className={style[`app`]} ref={containerRef}>
      <DaMap />
      <AgentList dom={containerRef} />
      <CloseAgent />
      {/* <OnchainData />
      <SwapAssistant />
      <ApyHunter />
      <Coinpedia />
      <JellyQuant />
      <Bubblenews /> */}
    </div>
  );
};

export default memo(Index);

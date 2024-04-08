/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo } from "react";
import { SolanaWalletLayout } from "@comp/global";
import { WithErrorBoundary } from "@comp/global";
import Demo from "@comp/demo";
interface Props {}

const Page: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <SolanaWalletLayout>
      <Demo />
    </SolanaWalletLayout>
  );
};

export default memo(Page);

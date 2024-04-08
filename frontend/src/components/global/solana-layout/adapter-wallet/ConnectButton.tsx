/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
interface Props {
  children?: React.ReactNode;
}

const ConnectButton: React.FC<Props> = (props) => {
  const { children } = props;
  const { connect, wallet, connected } = useWallet();
  return (
    <Button onClick={() => connect()}>
      {connected ? `Connected: ${wallet?.adapter.name}` : "Connect Wallet"}
    </Button>
  );
};

export default memo(ConnectButton);

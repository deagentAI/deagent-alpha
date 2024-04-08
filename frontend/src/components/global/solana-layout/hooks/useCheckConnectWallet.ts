import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const useCheckIsWalletConnected = () => {
  const { connect, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [walletConnect, setWalletConnect] = useState(false);
  // 打开连接钱包弹框
  const handleConnectWallet = async () => {
    setVisible(true);
  };
  // 手动断连钱包
  const handleDisconnectWallet = () => {
    disconnect();
  };
  useEffect(() => {
    setWalletConnect(connected);
  }, [connected]);
  return {
    walletConnect,
    handleConnectWallet,
    handleDisconnectWallet,
  };
};

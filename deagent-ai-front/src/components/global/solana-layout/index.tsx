import type { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { OKXWalletAdapter } from './adapter-wallet/OKXAdapter'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

export const SolanaWalletLayout: FC<PropsWithChildren<{}>> = (props) => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    return network === "mainnet-beta"
      ? "https://swr.xnftdata.com/rpc-proxy/"
      : clusterApiUrl(network);
  }, [network]);

  const wallets = [new PhantomWalletAdapter(), new OKXWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

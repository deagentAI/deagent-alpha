import React, { useEffect, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Percent, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { DEFAULT_TOKEN, TOKEN_PROGRAM_PROJECT_ID } from "@src/constants";
import { getWalletTokenAccount } from "@src/utils";
import { swapOnlyAmm } from "./swapOnlyAmm";

type webSocketChartItemType = {
  chatMessage: any;
  chatUid: string;
  handleSubMessage: (data: any) => void;
};

export const useSendToken = (params: webSocketChartItemType) => {
  // 连接钱包的弹窗

  const { connection } = useConnection();
  const wallet = useWallet();
  const { handleSubMessage, chatUid } = params;

  const onSwapClick = useCallback(
    async (symbolItem?: any) => {
      if (!wallet.publicKey) return;
      // @ts-ignore
      const inputToken = DEFAULT_TOKEN.WSOL; // SOL
      const outputToken = new Token(
        TOKEN_PROGRAM_PROJECT_ID,
        new PublicKey(symbolItem?.output),
        Number(symbolItem?.decimals),
        symbolItem.symbol,
        symbolItem.symbol
      );
      const targetPool = symbolItem?.target_pool;
      const inputTokenAmount = new TokenAmount(
        inputToken,
        Number(symbolItem?.amount) * 1e9
      );
      const slippage = new Percent(Number(symbolItem?.slippage), 100);
      const walletTokenAccounts = await getWalletTokenAccount(
        connection,
        wallet.publicKey
      );

      return swapOnlyAmm(
        {
          outputToken,
          targetPool,
          inputTokenAmount,
          slippage,
          walletTokenAccounts,
        },
        chatUid,
        wallet,
        handleSubMessage
      )
        .then(({ txids }: any) => {
          if (txids?.length) {
            handleSubMessage({
              value: txids[0],
              uid: chatUid,
              callbackSwap: "success",
            });
            return txids[0];
          }
        })
        .catch(() => {
          return Promise.reject({ error: "swapError" });
        });
    },
    [wallet.publicKey, wallet.sendTransaction, connection]
  );

  return {
    onSwapClick,
  };
};

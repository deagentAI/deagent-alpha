import {
  buildSimpleTransaction,
  InnerSimpleV0Transaction,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
  ApiPoolInfoV4,
  LIQUIDITY_STATE_LAYOUT_V4,
  Liquidity,
  MARKET_STATE_LAYOUT_V3,
  Market,
  SPL_MINT_LAYOUT,
} from "@raydium-io/raydium-sdk";

import { WalletSendTransactionError } from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  SendOptions,
  GetVersionedTransactionConfig,
} from "@solana/web3.js";
import axios from "axios";

import {
  addLookupTableInfo,
  connection,
  makeTxVersion,
  // wallet,
} from "@src/constants";
import { guid } from "@utils/index";

export async function sendTx(
  connection: Connection,
  chatUid: string,
  wallet: any,
  txs: any,
  handleSubMessage: any,
  options?: SendOptions
): Promise<string[]> {
  const txids: string[] = [];
  let errorOccurred: WalletSendTransactionError | null = null;

  for (const iTx of txs) {
    try {
      const txid = await wallet.sendTransaction(iTx, connection, options);
      txids.push(txid);
    } catch (error: any) {
      errorOccurred = error;
      if (error instanceof WalletSendTransactionError) {
        await handleSubMessage({
          value: "You have declined and the transaction failed.",
          uid: chatUid,
          callbackSwap: "rejected",
        });
        break;
      }
    }
  }
 
  return txids;
}


export async function getWalletTokenAccount(
  connection: Connection,
  wallet: PublicKey
): Promise<TokenAccount[]> {
  const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
}

export async function buildAndSendTx(
  innerSimpleV0Transaction: InnerSimpleV0Transaction[],
  chatUid: string,
  wallet: any,
  handleSubMessage: any,
  options?: SendOptions
) {
  const willSendTx = await buildSimpleTransaction({
    connection,
    makeTxVersion,
    payer: wallet.publicKey,
    innerTransactions: innerSimpleV0Transaction,
    addLookupTableInfo: addLookupTableInfo,
  });

  return await sendTx(
    connection,
    chatUid,
    wallet,
    willSendTx,
    handleSubMessage,
    options
  );
}

export async function formatAmmKeysById(id: string): Promise<ApiPoolInfoV4> {
  const account = await connection.getAccountInfo(new PublicKey(id));
  if (account === null) throw Error(" get id info error ");
  const info = LIQUIDITY_STATE_LAYOUT_V4.decode(account.data);

  const marketId = info.marketId;
  const marketAccount = await connection.getAccountInfo(marketId);
  if (marketAccount === null) throw Error(" get market info error");
  const marketInfo = MARKET_STATE_LAYOUT_V3.decode(marketAccount.data);

  const lpMint = info.lpMint;
  const lpMintAccount = await connection.getAccountInfo(lpMint);
  if (lpMintAccount === null) throw Error(" get lp mint info error");
  const lpMintInfo = SPL_MINT_LAYOUT.decode(lpMintAccount.data);

  return {
    id,
    baseMint: info.baseMint.toString(),
    quoteMint: info.quoteMint.toString(),
    lpMint: info.lpMint.toString(),
    baseDecimals: info.baseDecimal.toNumber(),
    quoteDecimals: info.quoteDecimal.toNumber(),
    lpDecimals: lpMintInfo.decimals,
    version: 4,
    programId: account.owner.toString(),
    authority: Liquidity.getAssociatedAuthority({
      programId: account.owner,
    }).publicKey.toString(),
    openOrders: info.openOrders.toString(),
    targetOrders: info.targetOrders.toString(),
    baseVault: info.baseVault.toString(),
    quoteVault: info.quoteVault.toString(),
    withdrawQueue: info.withdrawQueue.toString(),
    lpVault: info.lpVault.toString(),
    marketVersion: 3,
    marketProgramId: info.marketProgramId.toString(),
    marketId: info.marketId.toString(),
    marketAuthority: Market.getAssociatedAuthority({
      programId: info.marketProgramId,
      marketId: info.marketId,
    }).publicKey.toString(),
    marketBaseVault: marketInfo.baseVault.toString(),
    marketQuoteVault: marketInfo.quoteVault.toString(),
    marketBids: marketInfo.bids.toString(),
    marketAsks: marketInfo.asks.toString(),
    marketEventQueue: marketInfo.eventQueue.toString(),
    lookupTableAccount: PublicKey.default.toString(),
  };
}


function calculatePrice(amountA: number, decimalsA: number, amountB: number, decimalsB: number, 
  solPrice:number) {
  const adjustedAmountA = amountA / Math.pow(10, decimalsA);
  const adjustedAmountB = amountB / Math.pow(10, decimalsB);
  // 计算代币A对代币B的价格
  const priceOfAinB = adjustedAmountB / adjustedAmountA* solPrice;
  return priceOfAinB;
}

// 获取sol的实时价格
export async function fetchPrice(address: string): Promise<number> {
  const solPriceReq = await axios.get("https://api.raydium.io/v2/main/price")
  const solPrice = solPriceReq.data["So11111111111111111111111111111111111111112"]
    return solPrice;
}


export async function checkTransactionStatus(txid: string) {
  const rawConfig:GetVersionedTransactionConfig = {
    commitment: "confirmed",
    "maxSupportedTransactionVersion": 0
    // 根据需要添加更多配置项
  };
  const transDetail:any = await connection.getTransaction(txid, rawConfig)
  const status:any = transDetail?.meta?.status;
  if (status) {
    if (!status.Err) {
      console.log("Transaction succeeded");
      return true;
    } else {
      // 交易失败，可以进一步处理错误信息
      console.log("Transaction failed with error:", status.Err);
      return false;
    }
    }
  return false;
}

/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useState, useEffect } from "react";
import {
  Typography,
  Input,
  Slider,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  RaydiumIcon,
  USDCIcon,
  SolanaNewIcon,
  DownArrowIcon,
} from "@comp/global/svg-icon";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { message } from "@/components/global/message";
import { useSendToken } from "@comp/global/solana-layout/hooks/index";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { fetchPrice } from "@utils/index";
import { type webSocketChartItemType } from "@comp/demo";

import style from "./Swap.module.scss";
interface Props {
  swapParams: any;
  chatMessage: any;
  handleSubMessage: (data: any) => void;
  chatUid: string;
}

const Swap: React.FC<Props & webSocketChartItemType> = (props) => {
  const { swapParams, chatMessage, handleSubMessage, chatUid } = props;
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  // console.log(swapParams, "=swapParams");
  const { connection } = useConnection();
  const [slippage, setSlippage] = useState("1");
  const [stepSol, setStepSol] = useState(0);
  const [marks, setMarks] = useState<any>([]);
  const [solAmount, setSolAmount] = useState(0);
  const [solPrice, setSolPrice] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const { onSwapClick } = useSendToken({
    chatMessage,
    chatUid,
    handleSubMessage,
  });

  const isValidNumber = (numStr: any) => {
    if (numStr === "0." || numStr === "0") return true;
    const num = parseFloat(numStr);
    return !isNaN(num) && num >= 0 && num < 100;
  };

  const onChangeSlippage = (event: any) => {
    const value = event.target.value;
    if (value === "") {
      setSlippage(value);
      return;
    }
    if (/^(?:[1-9][0-9]?|100)$/.test(value)) {
      if (value === "" || isValidNumber(value)) {
        setSlippage(value);
      }
    }
  };

  const handleChange = (event: any, newValue: any) => {
    setSelectedAmount(Number(newValue.toFixed(5)));
  };

  const getPrice = async (address: string) => {
    const result = await fetchPrice(address);
    setSolPrice(result);
  };

  const getAmount = async () => {
    if (!publicKey) return;
    const balance = await connection.getBalance(
      new PublicKey(publicKey.toBase58())
    );
    const solBalance = Number(Number(balance / LAMPORTS_PER_SOL).toFixed(5));
    const mark = [
      { value: 0, label: "0" },
      { value: solBalance, label: `${solBalance} SOL` },
    ];
    setMarks(mark);
    setStepSol(solBalance * 0.1);
    setSolAmount(solBalance);
  };

  const handleMaxAmount = () => {
    setSelectedAmount(solAmount);
  };

  const handleSwapClick = async () => {
    if (!publicKey) {
      setVisible(true);
      return;
    }
    if (hasClicked) return; 
    if (selectedAmount === 0) {
      message.alert({
        msg: "Please Select Amount!",
        type: "warning",
      });
      return;
    }
    setIsProcessing(true);
    const { token_address, symbol, decimals, pair } = swapParams;
    try {
      await onSwapClick({
        output: token_address,
        symbol,
        decimals,
        target_pool: pair,
        amount: selectedAmount,
        slippage,
      });
      getAmount();
      setIsProcessing(false);
      setHasClicked(true);
    } catch (error: any) {
      setIsProcessing(false);
      setHasClicked(true);
    }
  };

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      getPrice(address);
      getAmount();
    }
  }, [publicKey]);

  useEffect(() => {
    if (solPrice && solAmount && swapParams?.price) {
      const changeAmount = Number(
        Number((solAmount * solPrice) / Number(swapParams?.price)).toFixed(5)
      );
      setTokenAmount(changeAmount);
    }
  }, [swapParams?.price, solPrice, solAmount]);

  const stopSwapClick = async () => {
    setHasClicked(true);
    await handleSubMessage({
      value: "You have declined and the transaction failed.",
      uid: chatUid,
      callbackSwap: "rejected",
    });
  }

  return (
    <Typography component={"div"} className={style["app"]}>
      <div className="swap-card">
        <div className="head">
          <div>Selected DEX:</div>
          <div className="flex items-center">
            <div className="icon-bg">
              <div className="raydium-icon">
                <RaydiumIcon />
              </div>
            </div>
            <div className="mx-[8px]">Raydium(Solana)</div>
            <DownArrowIcon />
          </div>
        </div>
        <div className="input-middle">
          {isProcessing ? (
            <div>Your Transaction:</div>
          ) : (
            <div>Your input token:</div>
          )}
          <div className="middle-right">
            <div className="token">
              <img src={swapParams?.logo} alt="" width={17} height={16} />
              <span className="spacing">{swapParams?.symbol}</span>
              <DownArrowIcon />
            </div>
            <div className="flex items-center">
              <span>Slippage:</span>
              {isProcessing ? (
                <span className="ml-[4px]">{slippage}%</span>
              ) : (
                <Input
                  className="slippage-input"
                  value={slippage}
                  onChange={onChangeSlippage}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  type="text"
                  inputProps={{
                    maxLength: 6,
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={`change-token ${isProcessing ? "center" : ""}`}>
          <div className="flex">
            <span>{tokenAmount}</span>
            <span className="spacing">{swapParams?.symbol}</span>
            <span className="spacing">&asymp;</span>
            <span className="spacing">{solAmount}</span>
            <SolanaNewIcon />
            <span className="ml-[4px]">SOL</span>
          </div>
          {!isProcessing ? (
            <div className="max-button" onClick={handleMaxAmount}>
              MAX
            </div>
          ) : null}
        </div>
        <Slider
          className="slider-card"
          aria-label="Custom marks"
          value={selectedAmount || 0}
          defaultValue={0}
          step={stepSol}
          min={0}
          max={solAmount}
          valueLabelDisplay="auto"
          marks={marks}
          valueLabelFormat={(value) => `${Number(value.toFixed(5))} SOL`}
          onChange={handleChange}
        />
        {isProcessing ? (
          <div className="processing-button">
            <CircularProgress size={24} />
            <span className="ml-[8px]">Processing your transaction</span>
          </div>
        ) : (
          <div className={`swap-button ${hasClicked ? "forbid-button" : ""}`} onClick={handleSwapClick}>
            Swap
          </div>
        )}
        {hasClicked ? <div className="stopSwap-button forbid-button">
            Stop Swap
          </div> : <div className="stopSwap-button" onClick={stopSwapClick}>
            Stop Swap
          </div>}
      </div>
    </Typography>
  );
};

export default memo(Swap);

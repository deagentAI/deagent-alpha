import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDemoStore } from "@src/store";
import { abbreviateAddress } from "@src/utils";

export const useGetWalletAddress = () => {
  const { publicKey } = useWallet();
  const { storeWalletAddress, walletAddress: cacheWalletAddress } =
    useDemoStore();
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      const currentAddress = abbreviateAddress(address, 4);
      setWalletAddress(currentAddress);
      storeWalletAddress(currentAddress);
    }
  }, [publicKey]);
  useEffect(() => {
    if (cacheWalletAddress) {
      setWalletAddress(cacheWalletAddress);
    }
  }, [cacheWalletAddress]);
  return {
    walletAddress,
  };
};

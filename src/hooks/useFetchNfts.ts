import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { chains } from "../utils/types";

export const useFetchNfts = (nftChain: chains) => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<any | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `./api/retrieving-nft/?address=${address}&chain=${nftChain}&pageKey=10`
        );
        const data = await res.json();
        setNfts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    };
    isConnected && fetchNfts();
    console.count("useFetch nfts running");
  }, [address, isConnected, nftChain]);

  return { nfts, error, isLoading };
};

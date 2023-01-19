import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { chains } from "../utils/types";

export const useFetchTxns = ({
  txnsChain,
  txnsType,
}: {
  txnsChain: chains;
  txnsType: string;
}) => {
  const { address, isConnected } = useAccount();
  const [txns, setTxns] = useState<any | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `./api/retrieving-txns/?address=${address}&chain=${txnsChain}&page=1&limit=10&category=${txnsType}`
        );
        const data = await res.json();
        setTxns(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    };
    isConnected && fetchTxns();
    console.count("useTxns assets running");
  }, [isConnected, txnsChain, txnsType, address]);

  return { txns, error, isLoading };
};

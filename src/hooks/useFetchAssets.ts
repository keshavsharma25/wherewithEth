import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { Assets } from "../utils/types";

interface UseFetchAssetsProps {
  address: string | undefined;
}

export const useFetchAssets = () => {
  const { address, isConnected } = useAccount();
  const [assets, setAssets] = useState<any | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `./api/retrieving-coins/?address=${address}&chain=all`
        );
        const data = await res.json();
        setAssets(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    };
    isConnected && fetchAssets();
    console.count("useFetch assets running");
  }, [address, isConnected]);

  return { assets, error, isLoading };
};

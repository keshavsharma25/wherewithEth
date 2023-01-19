import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { chains } from "../utils/types";

const fetchNfts = async (address: `0x${string}`, nftChain: chains) => {
  const res = await fetch(
    `./api/retrieving-nft/?address=${address}&chain=${nftChain}&pageKey=10`
  );
  return await res.json();
};
export const useFetchNfts = (nftChain: chains) => {
  const { address, isConnected } = useAccount();
  return useQuery({
    queryKey: ["nfts", address, nftChain],
    queryFn: async () => await fetchNfts(address!, nftChain),
    enabled: isConnected,
  });
};

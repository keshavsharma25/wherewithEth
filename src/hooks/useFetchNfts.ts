import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chain as chains } from "../utils/types";

const fetchNfts = async (address: `0x${string}`, nftChain: chains) => {
  const res = await axios(
    `./api/retrieving-nft/?address=${address}&chain=${nftChain}&pageKey=10`
  ).then((res) => res.data);
  return res;
};
export const useFetchNfts = (nftChain: chains) => {
  const { address, isConnected } = useAccount();
  return useQuery({
    queryKey: ["nfts", address, nftChain],
    queryFn: async () => await fetchNfts(address!, nftChain),
    enabled: isConnected,
  });
};

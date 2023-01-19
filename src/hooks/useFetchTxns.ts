import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { chains } from "../utils/types";

const fetchTxns = async (
  address: `0x${string}`,
  txnsChain: chains,
  txnsType: string
) => {
  const res = await fetch(
    `./api/retrieving-txns/?address=${address}&chain=${txnsChain}&page=1&limit=10&category=${txnsType}`
  );
  return await res.json();
};
export const useFetchTxns = ({
  txnsChain,
  txnsType,
}: {
  txnsChain: chains;
  txnsType: string;
}) => {
  const { address, isConnected } = useAccount();
  return useQuery({
    queryKey: ["txns", address, txnsChain, txnsType],
    queryFn: async () => await fetchTxns(address!, txnsChain, txnsType),
    enabled: isConnected,
  });
};

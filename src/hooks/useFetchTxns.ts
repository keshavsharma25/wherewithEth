import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chain as chains } from "../utils/types";

const fetchTxns = async (
  address: `0x${string}`,
  txnsChain: chains,
  txnsType: string
) => {
  const res = await axios(
    `./api/retrieving-txns/?address=${address}&chain=${txnsChain}&page=1&limit=10&category=${txnsType}`
  ).then((res) => res.data);
  return res;
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

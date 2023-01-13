import { Box, Flex } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { chains } from "../utils/types";
import {
  Blockies,
  NetworthCard,
  NftBlock,
  Transactions,
} from "./AssetsComponents";
import { CoinsCard } from "./AssetsComponents/CoinsCard";

export interface IAssetsProps {}

export const userDetailContext = createContext<any | null>(null);

export function Assets(props: IAssetsProps) {
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [userNfts, setUserNfts] = useState<any>(null);
  const [assetChain, setAssetChain] = useState("all");
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [nftLoading, setNftLoading] = useState(false);
  const [nftChain, setNftChain] = useState<chains>("eth-mainnet");
  const [txnsChain, setTxnsChain] = useState<chains>("eth-mainnet");
  const [transactions, setTransactions] = useState<any>(null);
  const [txnsType, setTxnsType] = useState("erc20");

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      setAssetsLoading(true);
      const res = await fetch(
        `./api/retrieving-coins/?address=${address}&chain=all`
      );
      const data = await res.json();
      console.log("fetch balance is running", data);

      setUserDetails(data);
      setAssetsLoading(false);
    };
    fetchBalance();
  }, [address]);

  useEffect(() => {
    const fetchNfts = async () => {
      setNftLoading(true);
      const res = await fetch(
        `./api/retrieving-nft/?address=${address}&chain=${nftChain}&pageKey=10`
      );
      const data = await res.json();
      setUserNfts(data);
      setNftLoading(false);
    };
    fetchNfts();
  }, [address, nftChain]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch(
        `./api/retrieving-txns/?address=${address}&chain=${txnsChain}&page=1&limit=10&category=${txnsType}`
      );
      const data = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, [txnsChain, address, txnsType]);

  useEffect(() => {
    console.log("user assets", userDetails);
  }, [address, userDetails]);

  return (
    <userDetailContext.Provider value={userDetails}>
      <Box paddingX="2rem" pt="5rem" minHeight="100vh">
        <Flex justifyContent="space-between" alignItems="center">
          <Blockies />
          <NetworthCard
            balance={
              userDetails?.networth
                ? Number(userDetails?.networth?.toFixed(2))
                : 0
            }
          />
        </Flex>
        <Flex mt={10}>
          <CoinsCard
            loading={assetsLoading}
            chain={assetChain}
            setChain={(value) => setAssetChain(value)}
          />
        </Flex>
        <NftBlock
          loading={nftLoading}
          setChain={setNftChain}
          userNfts={userNfts}
        />
        <Transactions
          setTxnsType={setTxnsType}
          setChain={setTxnsChain}
          data={transactions?.result}
        />
      </Box>
    </userDetailContext.Provider>
  );
}

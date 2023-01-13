import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState, createContext } from "react";
import {
  Blockies,
  NetworthCard,
  NftCard,
  NftBlock,
  Transactions,
} from "./AssetsComponents";
import { useAccount, useEnsName } from "wagmi";
import { CoinsCard } from "./AssetsComponents/CoinsCard";
import { chains } from "../utils/types";

export interface IAssetsProps {}

export const userDetailContext = createContext<any | null>(null);

export function Assets(props: IAssetsProps) {
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [userNfts, setUserNfts] = useState<any>(null);
  const [assetChain, setAssetChain] = useState("all");
  const [nftChain, setNftChain] = useState<chains>("eth-mainnet");
  const [txnsChain, setTxnsChain] = useState<chains>("eth-mainnet");
  const [transactions, setTransactions] = useState<any>(null);
  const [txnsType, setTxnsType] = useState("erc20");

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(
        `./api/retrieving-coins/?address=${address}&chain=${assetChain}`
      );
      const data = await res.json();
      console.log("fetch balance is running", data);

      setUserDetails(data);
    };
    fetchBalance();
  }, [address, assetChain]);

  useEffect(() => {
    const fetchNfts = async () => {
      const res = await fetch(
        `./api/retrieving-nft/?address=${address}&chain=${nftChain}&pageKey=10`
      );
      const data = await res.json();
      setUserNfts(data);
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

  // useEffect(() => {
  //   console.log("user assets", userDetails);
  // }, [address, userDetails]);

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
          <CoinsCard setChain={(value) => setAssetChain(value)} />
        </Flex>
        <NftBlock setChain={setNftChain} userNfts={userNfts} />
        <Transactions
          setTxnsType={setTxnsType}
          setChain={setTxnsChain}
          data={transactions?.result}
        />
      </Box>
    </userDetailContext.Provider>
  );
}

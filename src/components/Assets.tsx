import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState, createContext } from "react";
import { Blockies, NetworthCard, NftCard, NftBlock } from "./AssetsComponents";
import { useAccount, useEnsName } from "wagmi";
import { CoinsCard } from "./AssetsComponents/CoinsCard";
import { Assets } from "../types";

export interface IAssetsProps {}

export const userDetailContext = createContext<any | null>(null);

export function Assets(props: IAssetsProps) {
  const [userDetails, setUserDetails] = useState<Assets | null>(null);
  const [userNfts, setUserNfts] = useState<any>(null);
  const [chain, setChain] = useState("matic-mainnet");

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(`./api/retrieving-coins/?address=${address}`);
      const data = await res.json();
      console.log("fetch balance is running", data.total_balance);

      setUserDetails({
        ...userDetails!,
        total_balance: data?.total_balance,
        items: data?.items,
      });
    };
    fetchBalance();
  }, [address]);

  useEffect(() => {
    const fetchNfts = async () => {
      const res = await fetch(
        `./api/retrieving-nft/?address=${address}&chain=${chain}&pageKey=10`
      );
      const data = await res.json();
      setUserNfts(data);
    };
    fetchNfts();
  }, [address, chain]);

  useEffect(() => {
    console.log("userNfts", userNfts);
  }, [userNfts]);

  return (
    <userDetailContext.Provider value={userDetails}>
      <Box paddingX="2rem" pt="5rem" minHeight="100vh">
        <Flex justifyContent="space-between" alignItems="center">
          <Blockies />
          <NetworthCard
            balance={
              userDetails?.total_balance
                ? Number(userDetails.total_balance?.toFixed(2))
                : 0
            }
          />
        </Flex>
        <Flex mt={10}>
          <CoinsCard />
        </Flex>
        <NftBlock setChain={setChain} userNfts={userNfts} />
      </Box>
    </userDetailContext.Provider>
  );
}

import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState, createContext } from "react";
import { Blockies, NetworthCard, NftCard } from "./AssetsComponents";
import { useAccount, useEnsName } from "wagmi";
import { CoinsCard } from "./AssetsComponents/CoinsCard";
import { Assets } from "../utils/types";

export interface IAssetsProps {}

export const userDetailContext = createContext<Assets | null>(null);

export function Assets(props: IAssetsProps) {
  const [userDetails, setUserDetails] = useState<Assets | null>(null);

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
      </Box>
    </userDetailContext.Provider>
  );
}

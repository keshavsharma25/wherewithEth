import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState, createContext } from "react";
import { Blockies, NetworthCard } from "./AssetsComponents";
import { useAccount, useEnsName } from "wagmi";
import { CoinsCard } from "./AssetsComponents/CoinsCard";
import { UserAssets } from "../utils";

export interface IAssetsProps {}

export const userDetailContext = createContext<UserAssets | null>(null);

export function Assets(props: IAssetsProps) {
  const [userDetails, setUserDetails] = useState<UserAssets | null>(null);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(`./api/fetchCoins/?address=${address}`);
      const data: UserAssets = await res.json();
      console.log("fetch balance is running", data.total_balance);

      setUserDetails({
        ...userDetails!,
        total_balance: data?.total_balance,
        items: data?.items,
      });
    };
    fetchBalance();
  }, [address, userDetails?.total_balance]);

  return (
    <userDetailContext.Provider value={userDetails}>
      <Box paddingX="2rem" pt="5rem">
        <Flex justifyContent="space-between" alignItems="center">
          <Blockies />
          <NetworthCard
            balance={
              userDetails?.total_balance
                ? Number(userDetails.total_balance.toFixed(2))
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

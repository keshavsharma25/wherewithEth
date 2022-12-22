import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState, createContext } from "react";
import { Blockies, NetworthCard } from "./AssetsComponents";
import { useAccount, useEnsName } from "wagmi";
import { CoinsCard } from "./AssetsComponents/CoinsCard";

export interface IAssetsProps {}

type UserDetailType = {
  address: string;
  balance: number;
  ensName?: string;
};

export const userDetailContext = createContext<UserDetailType | null>(null);

export function Assets(props: IAssetsProps) {
  const [userDetails, setUserDetails] = useState<UserDetailType>({
    address: "",
    balance: 0,
    ensName: "",
  });

  const { address, isConnected } = useAccount();

  const {
    data: ens,
    isLoading: ensLoading,
    isError: ensError,
  } = useEnsName({
    address: address,
    chainId: 1,
  });

  // useEffect(() => {
  //   if (isConnected && address) {
  //     setUserDetails({ ...userDetails, address: address });
  //   }
  // }, [isConnected, address, userDetails.address]);

  useEffect(() => {
    if (isConnected && !ensLoading) {
      setUserDetails({ ...userDetails, ensName: ens! });
    }
  }, [ens, ensLoading, userDetails.ensName]);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(
        `./api/fetchCoins/?address=${address}&chainId=1&quote-currency=USD`
      );
      const data = await res.json();
      setUserDetails({
        ...userDetails,
        balance: data.total_balance,
        address: data.address,
      });
    };
    fetchBalance();
  }, [address, userDetails.balance]);

  return (
    <userDetailContext.Provider value={userDetails}>
      <Box paddingX="2rem" pt="5rem">
        <Flex justifyContent="space-between" alignItems="center">
          <Blockies isLoading={ensLoading} />
          <NetworthCard
            balance={
              Number(userDetails.balance.toFixed(2))
                ? Number(userDetails.balance.toFixed(2))
                : 0
            }
          />
        </Flex>
        <Flex>
          <CoinsCard />
        </Flex>
      </Box>
    </userDetailContext.Provider>
  );
}

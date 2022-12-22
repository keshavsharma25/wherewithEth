import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Blockies, NetworthCard } from "./AssetsComponents";
import { useAccount } from "wagmi";

export interface IAssetsProps {}

export function Assets(props: IAssetsProps) {
  const [balance, setBalance] = useState(0);
  const balanceExp = balance?.toFixed(2);
  const { address } = useAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(
        `./api/fetchCoins/?address=${address}&chainId=1&quote-currency=USD`
      );
      const data = await res.json();
      setBalance(data.total_balance);
    };
    fetchBalance();
  }, []);

  return (
    <Box paddingX="2rem" pt="5rem">
      <Flex justifyContent="space-between" alignItems="center">
        <Blockies />
        <NetworthCard
          balance={Number(balance.toFixed(2)) ? Number(balance.toFixed(2)) : 0}
        />
      </Flex>
    </Box>
  );
}

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Identicon from "react-blockies";
import { useAccount, useEnsName } from "wagmi";

export interface IBlockiesProps {
  isLoading: boolean;
}

export function Blockies() {
  const { address, isConnected } = useAccount();

  const { data: ensName, isLoading } = useEnsName({
    address: address,
    chainId: 1,
  });

  const addressExp = address?.substring(0, 5) + ".." + address?.substring(40);

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justifyContent={{ base: "center", sm: "flex-start" }}
      alignItems="center"
      mx={{ base: "auto", sm: "0" }}
      gap={5}
    >
      <Box borderRadius="full" overflow="hidden" width="6.8rem" height="6.8rem">
        <Identicon seed={address! as string} size={11} scale={10} />
      </Box>
      <Box textAlign={{ base: "center", sm: "left" }}>
        <Heading color="white" fontSize="1.3rem" fontWeight="bold">
          {isLoading ? addressExp : ensName ? ensName : addressExp}
        </Heading>
        <Text color="#647087" fontSize="1rem" fontWeight="normal">
          {isConnected && addressExp}
        </Text>
      </Box>
    </Flex>
  );
}

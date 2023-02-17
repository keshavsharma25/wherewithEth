import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { VyktProfile } from "vykt-sdk";
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
      <Box>
        <VyktProfile address={address!} size="md" type="square" />
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

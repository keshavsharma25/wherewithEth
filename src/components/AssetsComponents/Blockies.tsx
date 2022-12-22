import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import Identicon from "react-blockies";
import { useAccount, useEnsName } from "wagmi";

export interface IBlockiesProps {}

export function Blockies(props: IBlockiesProps) {
  const { address } = useAccount();
  const addressExp = address?.substring(0, 5) + ".." + address?.substring(40);
  const {
    data: ens,
    isError,
    isLoading,
  } = useEnsName({
    address: address,
    chainId: 1,
  });
  React.useEffect(() => {
    console.log(ens);
  }, [ens, isLoading]);

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      <Box borderRadius="full" overflow="hidden" width="6.8rem" height="6.8rem">
        <Identicon seed={address! as string} size={11} scale={10} />
      </Box>
      <Box>
        <Heading color="white" fontSize="1.3rem" fontWeight="bold">
          {isLoading ? addressExp : ens ? ens : addressExp}
        </Heading>
        <Text color="#647087" fontSize="1rem" fontWeight="normal">
          {addressExp}
        </Text>
      </Box>
    </Flex>
  );
}

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import Identicon from "react-blockies";
import { userDetailContext } from "../Assets";

export interface IBlockiesProps {
  isLoading: boolean;
}

export function Blockies({ isLoading }: IBlockiesProps) {
  const userData = useContext(userDetailContext);

  const addressExp =
    userData!.address?.substring(0, 5) +
    ".." +
    userData!.address?.substring(40);

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap={5}>
      <Box borderRadius="full" overflow="hidden" width="6.8rem" height="6.8rem">
        <Identicon seed={userData!.address! as string} size={11} scale={10} />
      </Box>
      <Box>
        <Heading color="white" fontSize="1.3rem" fontWeight="bold">
          {isLoading
            ? addressExp
            : userData!.ensName
            ? userData!.ensName
            : addressExp}
        </Heading>
        <Text color="#647087" fontSize="1rem" fontWeight="normal">
          {addressExp}
        </Text>
      </Box>
    </Flex>
  );
}

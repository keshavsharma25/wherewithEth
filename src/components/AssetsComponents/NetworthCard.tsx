import { Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { IoIosWallet } from "react-icons/io";

export interface INetworthCardProps {
  balance: number;
}

export function NetworthCard({ balance }: INetworthCardProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap="1.5rem"
      bg="#20223A"
      height="max-content"
      paddingLeft="1.5rem"
      paddingY="0.5rem"
      borderRadius="0.5rem"
      paddingRight="3rem"
    >
      <IoIosWallet size="2.5rem" color="white" />
      <Flex direction="column" gap="0.25rem">
        <Text color="#647087" fontSize="0.8rem">
          Your Net worth
        </Text>
        <Heading color="white" fontSize="1.5rem" fontWeight="extrabold">
          ${balance}
        </Heading>
      </Flex>
    </Flex>
  );
}

import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BsBarChartFill } from "react-icons/bs";
import CoinInnerCard from "./CoinInnerCard";

export const CoinsCard = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      direction="column"
      width="full"
      gap="5"
    >
      <Flex justifyContent="center" alignItems="center" gap="2">
        <BsBarChartFill size="24" color="white" />{" "}
        <Heading fontSize="1.3rem" fontWeight="bold" color="white">
          Assets
        </Heading>
      </Flex>
      <Flex direction="column" width="full">
        <Flex justifyContent="space-between" alignItems="center" width="full">
          <Text color="#647087">CURRENCY</Text>
          <Text color="#647087">QTY</Text>
        </Flex>
        <Flex></Flex>
      </Flex>
    </Flex>
  );
};

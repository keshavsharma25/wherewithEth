import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react";
import * as React from "react";
import Identicon from "react-blockies";
export interface ICoinInnerCardProps {
  address: string;
  image: string | null;
  name: string;
  bgColor: string;
  token_value: number;
  incrasePercentage: number;
  quantity: number;
  value: number;
}

export default function CoinInnerCard({
  address,
  image,
  name,
  token_value,
  incrasePercentage,
  quantity,
  bgColor,
  value,
}: ICoinInnerCardProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="5"
      width="full"
      borderBottom="1px"
      borderBottomColor="rgba(255,255,255,0.08)"
      pb={3}
    >
      <Flex justifyContent="center" gap={3}>
        <Box boxShadow="2xl" p="3" borderRadius="full" overflow="hidden">
          {image ? (
            <Image
              zIndex="10"
              height="14"
              width="14"
              src={image}
              alt={"Logo"}
            />
          ) : name === "ETH" ? (
            <Image
              zIndex="10"
              height="14"
              width="14"
              src={`https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880`}
              alt={"Logo"}
            />
          ) : (
            <Box
              zIndex="10"
              borderRadius="full"
              overflow="hidden"
              width="3rem"
              height="3rem"
            >
              <Identicon seed={address as string} size={11} scale={18} />
            </Box>
          )}
        </Box>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="2"
        >
          <Heading color="white" fontSize="1.2rem">
            {name}
          </Heading>
          <Flex justifyContent="center" alignItems="center" gap="2">
            <Text color="#647087">$ {token_value?.toFixed(2)}</Text>
            <Text color={incrasePercentage > 0 ? "#35DAB2" : "#E31C26"}>
              {incrasePercentage}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="2" alignItems="flex-end">
        <Heading fontSize="1.2rem" color="white">
          {quantity}
        </Heading>
        <Text color="#647087">$ {value}</Text>
      </Flex>
    </Flex>
  );
}

import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

interface NftCardProps {
  image: string;
  name: string;
  chainSymbol: string;
  chainName: string;
  tokenId: string;
  price: number;
}

export const NftCard = ({
  image,
  name,
  chainSymbol,
  chainName,
  price,
}: NftCardProps) => {
  return (
    <Box bg="#1D1F37" rounded="md">
      <Box position="relative" maxW="80">
        <Image
          position="absolute"
          w="40px"
          top="1"
          left="1"
          src={chainSymbol}
          alt={chainName}
        />
        <Image src={image} alt={name} />
      </Box>
      <Box p={2}>
        <Heading fontSize="1.2rem" color="white">
          {name}
        </Heading>
        <Text color="white">{price} eth</Text>
      </Box>
    </Box>
  );
};

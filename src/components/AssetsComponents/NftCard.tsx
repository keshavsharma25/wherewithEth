import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

interface NftCardProps {
  image: string;
  name: string;
  chainSymbol?: string;
  chainName: string;
  tokenId: string;
  price: number;
  imageFormat: string;
}

export const NftCard = ({ image, name, price, imageFormat }: NftCardProps) => {
  return (
    <Box bg="#1D1F37" rounded="md" minW="300px" overflow="hidden">
      <Box position="relative" w="300px">
        {imageFormat === "mp4" ? (
          <video>
            <source src={image} />
          </video>
        ) : (
          <Image w="full" src={image} alt={name} objectFit="cover" />
        )}
      </Box>
      <Box p={2}>
        <Heading fontSize="1.2rem" color="white">
          {name}
        </Heading>
        <Text mt={2} color="white">
          {price ? `${price} ETH` : null}
        </Text>
      </Box>
    </Box>
  );
};

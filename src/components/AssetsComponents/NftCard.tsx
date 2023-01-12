import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
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
    <Box
      bg="#1D1F37"
      rounded="md"
      minW="250px"
      overflow="hidden"
      boxShadow="lg"
      mb="5"
    >
      <Box position="relative" w="250px" p="4" rounded="md" overflow="hidden">
        {imageFormat === "mp4" ? (
          <video>
            <source src={image} />
          </video>
        ) : (
          <Image
            style={{ aspectRatio: 1 }}
            w="full"
            src={image}
            alt={name}
            objectFit="cover"
          />
        )}
      </Box>
      <Flex justify="space-between" alignItems="center" p={2}>
        <Heading fontSize="1rem" color="white">
          {name}
        </Heading>
        <Text color="white">{price ? `${price?.toFixed(4)} ETH` : null}</Text>
      </Flex>
    </Box>
  );
};

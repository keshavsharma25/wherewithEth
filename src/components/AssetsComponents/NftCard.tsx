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
      <Box
        position="relative"
        w="250px"
        p="4"
        borderRadius="5px"
        overflow="hidden"
      >
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
      <Flex justify="space-between" alignItems="flex-start" px={4}>
        <Box>
          <Heading fontSize="1rem" color="white">
            {name}
          </Heading>
        </Box>
        <Box>
          {price && <Text color="gray.300">Floor price</Text>}
          <Text color="white">{price ? `Ξ ${price?.toFixed(4)}` : null}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

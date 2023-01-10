import React, { useState } from "react";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { NftCard } from "./NftCard";

interface NftBlockProps {
  userNfts: any;
  setChain: any;
}

export const NftBlock: React.FC<NftBlockProps> = ({ userNfts, setChain }) => {
  const chainHadler = (e: any) => {
    setChain(e.target.value);
  };

  return (
    <Box bg="#1B1D30" mt={10} borderRadius="12px" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
          Nft
        </Text>
        <Box float="right">
          <Select onChange={(e) => chainHadler(e)} color="white" w="max">
            <option defaultChecked value="eth-mainnet">
              Ethereum
            </option>
            <option value="matic-mainnet">Polygon</option>
            <option value="opt-mainnet">Optimism</option>
            <option value="arb-mainnet">Arbitrum</option>
          </Select>
        </Box>
      </Flex>

      <Flex
        gap={3}
        minW="full"
        overflowX="scroll"
        scrollBehavior="smooth"
        css={{
          "&::-webkit-scrollbar": {
            width: "2px",
            height: "5px",
          },
          "&::-webkit-scrollbar-track": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.2)",
            borderRadius: "10px",
          },
        }}
      >
        {userNfts?.ownedNfts.length > 0 ? (
          userNfts?.ownedNfts?.map(
            (nft: any, index: number) =>
              nft.media[0].raw !== "" && (
                <NftCard
                  key={index}
                  chainName={userNfts?.chain}
                  imageFormat={nft?.media[0].format}
                  image={
                    nft?.media[0]?.format === "svg+xml"
                      ? nft?.media[0]?.thumbnail
                      : nft?.media[0]?.gateway
                  }
                  name={nft?.title}
                  price={nft?.contractMetadata?.openSea?.floorPrice}
                  tokenId={nft?.contract?.address}
                />
              )
          )
        ) : (
          <Text color="white" fontSize="1.5rem" mx="auto" fontWeight="bold">
            No Nft found
          </Text>
        )}
      </Flex>
    </Box>
  );
};

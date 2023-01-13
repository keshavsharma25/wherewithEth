import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { ChainSelector } from "../ChainSelector";
import { NftCard } from "./NftCard";

interface NftBlockProps {
  userNfts: any;
  setChain: any;
  loading: boolean;
}

export const NftBlock: React.FC<NftBlockProps> = ({
  userNfts,
  setChain,
  loading,
}) => {
  const chainHandler = (value: string) => {
    setChain(value);
  };

  return (
    <Box bg="#1B1D30" mt={10} borderRadius="12px" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
          Nft
        </Text>
        <Box float="right">
          <ChainSelector setChain={(value) => chainHandler(value)} />
        </Box>
      </Flex>

      {loading ? (
        <Spinner mx="auto" size="xl" color="blue.500" />
      ) : (
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
                        ? nft.contractMetadata.openSea.collectionName ===
                          "ENS: Ethereum Name Service"
                          ? nft.media[0].raw
                          : nft?.media[0]?.thumbnail
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
      )}
    </Box>
  );
};

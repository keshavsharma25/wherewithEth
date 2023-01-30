import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { FiBox } from "react-icons/fi";

import { ChainSelector } from "../ChainSelector";
import { NftCard } from "./NftCard";
import { Chain as chains } from "../../utils/types";

interface NftBlockProps {
  userNfts: any;
  setChain: (value: chains) => void;
  loading: boolean;
}

const NftBlock = ({ userNfts, setChain, loading }: NftBlockProps) => {
  const chainHandler = (value: chains) => {
    setChain(value);
  };
  const options = [
    {
      value: chains.eth,
      label: "Ethereum",
    },
    {
      value: chains.matic,
      label: "Polygon",
    },
    {
      value: chains.opt,
      label: "Optimism",
    },
    {
      value: chains.arb,
      label: "Arbitrum",
    },
  ];

  return (
    <Box mt={10} borderRadius="12px" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Flex justifyContent="center" alignItems="center" gap={2}>
          <FiBox color="white" size="1.5rem" />
          <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
            Nft
          </Text>
        </Flex>

        <Box float="right">
          <ChainSelector
            options={options}
            setChain={(value) => chainHandler(value)}
          />
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

export const NftBlockMemo = React.memo(NftBlock);

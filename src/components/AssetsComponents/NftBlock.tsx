import React, { useState } from "react";
import { Box, Flex, Select } from "@chakra-ui/react";
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
    <Box>
      <Flex>
        <Select onChange={(e) => chainHadler(e)}>
          <option defaultChecked value="eth-mainnet">
            Ethereum
          </option>
          <option value="matic-mainnet">Polygon</option>
          <option value="opt-mainnet">Optimism</option>
          <option value="arb-mainnet">Arbitrum</option>
        </Select>
      </Flex>
      {userNfts?.chainNfts &&
        userNfts?.chainNfts?.map((nft: any, index: number) => (
          <NftCard
            key={index}
            chainName={userNfts?.chain}
            image={nft.media[0].raw}
            name={nft.title}
            price={nft.contractMetadata.openSea.floorPrice}
            tokenId={nft.contract.address}
          />
        ))}
    </Box>
  );
};

import { Box, Flex } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useFetchNfts } from "../hooks/useFetchNfts";
import { useFetchTxns } from "../hooks/useFetchTxns";
import { chains } from "../utils/types";
import {
  Blockies,
  NetworthCard,
  NftBlock,
  Transactions,
} from "./AssetsComponents";
import { CoinsCard } from "./AssetsComponents/CoinsCard";

export interface IAssetsProps {}

export const userDetailContext = createContext<any | null>(null);

export function Assets(props: IAssetsProps) {
  const [assetChain, setAssetChain] = useState("all");
  const [nftChain, setNftChain] = useState<chains>("eth-mainnet");
  const [txnsChain, setTxnsChain] = useState<chains>("eth-mainnet");
  const [txnsType, setTxnsType] = useState<string>("erc20");

  const {
    data: assets,
    error: assetsError,
    isLoading: assetsLoading,
  } = useFetchAssets();
  const {
    data: nfts,
    error: nftsError,
    isLoading: nftsLoading,
  } = useFetchNfts(nftChain);

  const {
    data: txns,
    error: txnsErrror,
    isLoading: txnsLoading,
  } = useFetchTxns({ txnsChain, txnsType });

  return (
    <userDetailContext.Provider value={assets}>
      <Box paddingX="2rem" pt="5rem" minHeight="100vh">
        <Flex
          direction={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Blockies />
          <NetworthCard
            loading={assetsLoading}
            balance={
              assets?.networth ? Number(assets?.networth?.toFixed(2)) : 0
            }
          />
        </Flex>
        <Flex mt={10}>
          <CoinsCard
            loading={assetsLoading}
            chain={assetChain}
            setChain={(value) => setAssetChain(value)}
          />
        </Flex>
        <NftBlock
          loading={nftsLoading}
          setChain={setNftChain}
          userNfts={nfts}
        />
        <Transactions
          setTxnsType={setTxnsType}
          setChain={setTxnsChain}
          data={txns?.result}
        />
      </Box>
    </userDetailContext.Provider>
  );
}

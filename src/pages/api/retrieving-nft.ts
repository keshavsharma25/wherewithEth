import { Network } from "alchemy-sdk";
import type { NftContract } from "alchemy-sdk/dist/src/api/nft";
import type {
  Media,
  NftMetadata,
  OwnedNft,
  OwnedNftsResponse,
} from "alchemy-sdk/dist/src/types/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { chain } from "wagmi";

interface NftInformation {
  contract: NftContract;
  tokenId: string;
  tokenType: string;
  title?: string;
  description?: string;
  rawMetadata?: NftMetadata;
  media?: Media[];
}

enum NetworkType {
  ETH_MAINNET = Network.ETH_MAINNET,
  MATIC_MAINNET = Network.MATIC_MAINNET,
  OPT_MAINNET = Network.OPT_MAINNET,
  ARB_MAINNET = Network.ARB_MAINNET,
}

const getNfts = async (
  address: string,
  chain: string,
  apiKey: string,
  pageKey: string = ""
) => {
  const URL = `https://${chain}.g.alchemy.com/nft/v2/${apiKey}/getNFTs`;
  let params: string = "";

  if (pageKey) {
    params = `?owner=${address}&withMetadata=true&excludeFilters[]=SPAM&pageKey=${pageKey}`;
  } else {
    if (chain === "eth-mainnet" || chain === "matic-mainnet") {
      params = `?owner=${address}&withMetadata=true&excludeFilters[]=SPAM&orderBy=transferTime`;
    } else {
      params = `?owner=${address}&withMetadata=true&excludeFilters[]=SPAM`;
    }
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(URL + params, options);
  const chainNfts: OwnedNftsResponse = await response.json();

  return chainNfts;
};

const filter = (nfts: NftInformation[]) => {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, chain, pageKey } = req.query;
  let apiKey: string | undefined;

  try {
    const chains: any = {
      [Network.ETH_MAINNET]: process.env
        .NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string,
      [Network.MATIC_MAINNET]: process.env
        .NEXT_PUBLIC_ALCHEMY_MATIC_API_KEY as string,
      [Network.OPT_MAINNET]: process.env
        .NEXT_PUBLIC_ALCHEMY_OPTIMISM_API_KEY as string,
      [Network.ARB_MAINNET]: process.env
        .NEXT_PUBLIC_ALCHEMY_ARBITRUM_API_KEY as string,
    };
    let allNfts: any = {};

    if (chain === "eth-mainnet") {
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string;
    } else if (chain === "matic-mainnet") {
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_MATIC_API_KEY as string;
    } else if (chain === "opt-mainnet") {
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_API_KEY as string;
    } else if (chain === "arb-mainnet") {
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_API_KEY as string;
    } else {
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string;
    }

    allNfts = await getNfts(
      address as string,
      chain as string,
      apiKey as string,
      pageKey ? (pageKey as string) : undefined
    );

    console.log("Chain: ", chain);
    console.log("NFTs: ", allNfts.totalCount);
    const nfts: NftInformation[] = allNfts?.ownedNfts?.map((nft: any) => {
      return {
        contract: {
          address: nft.contract.address,
          name: nft.contract.name,
          symbol: nft.contract.symbol,
          openSea: nft.contract.openSea,
        },
        tokenId: nft.tokenId,
        tokenType: nft.tokenType,
        title: nft.title,
        description: nft.description,
        contractMetadata: nft.contractMetadata,
        media: nft.media,
      };
    });
    allNfts = {
      chain: chain,
      pageKey: allNfts.pageKey ? allNfts.pageKey : null,
      totalCount: allNfts.totalCount,
      chainNfts: nfts,
    };

    res.status(200).json(allNfts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default handler;

import { OwnedNftsResponse } from "alchemy-sdk";
import axios from "axios";
import { Chain as chains, NftInformation } from "./types";

export const chainAlchemyApiMapper: { [key in chains]: string } = {
  "eth-mainnet": process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string,
  "matic-mainnet": process.env.NEXT_PUBLIC_ALCHEMY_MATIC_API_KEY as string,
  "opt-mainnet": process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISTIC_API_KEY as string,
  "arb-mainnet": process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_API_KEY as string,
};

export const getNfts = async (
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

  const { data: chainNfts } = await axios.get(URL + params, options);

  return chainNfts;
};

export const filter = (nfts: NftInformation[]) => {};

import { Media, NftContract, NftMetadata } from "alchemy-sdk";

export interface Token {
  token_address?: string;
  name: string;
  symbol: string;
  logo: string | null;
  thumbnail: string | null;
  decimals: number;
  balance: string;
  quote_rate: number;
  quote: number;
}

export interface Assets {
  address: string;
  chainId: number;
  updated_at: Date;
  quote_currency: string;
  total_balance: number;
  items: Token[];
}

export interface NftInformation {
  contract: NftContract;
  tokenId: string;
  tokenType: string;
  title?: string;
  description?: string;
  rawMetadata?: NftMetadata;
  media?: Media[];
}

export type NftType = {
  chain: chains;
  pageKey: string | null;
  totalCount: number;
  chainNfts: NftInformation[];
};

export type chains =
  | "eth-mainnet"
  | "matic-mainnet"
  | "opt-mainnet"
  | "arb-mainnet";

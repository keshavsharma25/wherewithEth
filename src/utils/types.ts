import { Media, NftContract, NftMetadata } from "alchemy-sdk";

export interface TokenType {
  token_address?: string;
  name: string;
  symbol: string;
  logo: string | null;
  thumbnail?: string | null;
  decimals: number;
  balance: string;
  quote_rate?: number;
  quote?: number;
  error?: {
    code: number;
    status: string;
    description: string;
  };
}

export interface Assets {
  address: string;
  chainId: number;
  updated_at: Date;
  quote_currency: string;
  total_balance: number;
  items: TokenType[];
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

export interface NftType {
  chain: chains;
  pageKey: string | null;
  totalCount: number;
  chainNfts: NftInformation[];
}

export interface nativeBalanceType {
  balance: string;
  chain: {
    _chainlistData: {
      name: string;
      chainId: number;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
    };
  };
}

export type chains =
  | "eth-mainnet"
  | "matic-mainnet"
  | "opt-mainnet"
  | "arb-mainnet";

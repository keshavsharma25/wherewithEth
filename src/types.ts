// export interface CoinItem {
//   contract_decimals: number;
//   contract_name: string;
//   contract_ticker_symbol: string;
//   contract_address: string;
//   supports_erc: string[];
//   balance: string;
//   balance_24h: string;
//   balance_percent_change_24h: string;
//   quote_rate: number;
//   quote_rate_24h: number;
//   quote_rate_percent_change_24h: number;
//   quote: number;
//   quote_24h: number;
//   quote_percent_change_24h: number;
//   logo_url: string;
//   nft_data: string[] | null;
// }

// export interface UserAssets {
//   address: string;
//   updated_at: string;
//   quote_currency: string;
//   chain_id: number;
//   total_balance: number;
//   items: CoinItem[];
// }

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

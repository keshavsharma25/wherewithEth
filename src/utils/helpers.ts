import { chains } from "./types";

export const chainUrlMapper: { [key in chains]: string } = {
  "eth-mainnet": "https://api.etherscan.io/api",
  "matic-mainnet": "https://api.polygonscan.com/api",
  "opt-mainnet": "https://api-optimistic.etherscan.io/api",
  "arb-mainnet": "https://api.arbiscan.io/api",
};

export const scanApiMapper: { [key in chains]: string } = {
  "eth-mainnet": process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string,
  "matic-mainnet": process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY as string,
  "opt-mainnet": process.env.NEXT_PUBLIC_OPTIMISTICSCAN_API_KEY as string,
  "arb-mainnet": process.env.NEXT_PUBLIC_ARBISCAN_API_KEY as string,
};

export const moralisScanMapper: { [key: string]: string } = {
  "eth-mainnet": "eth",
  "matic-mainnet": "polygon",
};

export const getCurrentBlock = async (chain: chains) => {
  const url = chainUrlMapper[chain];

  const apiKey = scanApiMapper[chain];
  const currentBlockHex = await (
    await fetch(`${url}?module=proxy&action=eth_blockNumber&apikey=${apiKey}`)
  ).json();

  const currentBlock = parseInt(currentBlockHex.result, 16);

  return currentBlock;
};

export const allChainsDecimals: { [key in string]: number } = {
  "eth-mainnet": 18,
  "matic-mainnet": 18,
  "opt-mainnet": 18,
};

export const getQuote = async (
  balance: string,
  decimals: number,
  rate: number
) => {
  return await ((parseInt(balance) / 10 ** decimals) * rate);
};

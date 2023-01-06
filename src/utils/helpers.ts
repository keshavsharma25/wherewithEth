import { chains } from "./types";
import { scanApiMapper } from "./etherscanHelpers";

export const chainUrlMapper: { [key in chains]: string } = {
  "eth-mainnet": "https://api.etherscan.io/api",
  "matic-mainnet": "https://api.polygonscan.com/api",
  "opt-mainnet": "https://api-optimistic.etherscan.io/api",
  "arb-mainnet": "https://api.arbiscan.io/api",
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

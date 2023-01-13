import { go } from "fuzzysort";
import { compareTwoStrings } from "string-similarity";
import { prisma } from "./prismaClient";
import { chains, TokenType } from "./types";

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

export const fuzzyMatchTokens = async (tokens: TokenType[]) => {
  const tokensInDB = await prisma.coins.findMany({
    select: { code: true },
  });
  const tokenCodesInDB = tokensInDB.map((t) => t.code);
  const tokensInDbList: string[] = [];

  const promises = tokens.map(async (token: TokenType) => {
    const results = go(token.symbol, tokenCodesInDB);
    const bestResult = results[0];

    if (bestResult && bestResult.score > -1) {
      const nameInDB = await prisma.coins.findUnique({
        where: { code: bestResult.target },
        select: { name: true },
      });

      let nameResult;
      if (nameInDB) {
        nameResult = compareTwoStrings(nameInDB.name, token.name);
      }

      if (nameResult && nameResult >= 0.6) {
        tokensInDbList.push(bestResult.target);
      }
    }
  });

  await Promise.all(promises);

  return tokensInDbList;
};

export const allChainsDecimals: { [key in string]: number } = {
  "eth-mainnet": 18,
  "matic-mainnet": 18,
  "opt-mainnet": 18,
};

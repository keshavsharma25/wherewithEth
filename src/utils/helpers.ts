import axios from "axios";
import { go } from "fuzzysort";
import { compareTwoStrings } from "string-similarity";
import { prisma } from "./prismaClient";
import { Chain, timePeriod, TokenType } from "./types";
import date from "moment";

export const chainUrlMapper: { [key in Chain]: string } = {
  "eth-mainnet": "https://api.etherscan.io/api",
  "matic-mainnet": "https://api.polygonscan.com/api",
  "opt-mainnet": "https://api-optimistic.etherscan.io/api",
  "arb-mainnet": "https://api.arbiscan.io/api",
};

export const scanApiMapper: { [key in Chain]: string } = {
  "eth-mainnet": process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string,
  "matic-mainnet": process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY as string,
  "opt-mainnet": process.env.NEXT_PUBLIC_OPTIMISTICSCAN_API_KEY as string,
  "arb-mainnet": process.env.NEXT_PUBLIC_ARBISCAN_API_KEY as string,
};

export const moralisScanMapper: { [key: string]: string } = {
  "eth-mainnet": "eth",
  "matic-mainnet": "polygon",
};

export const getCurrentBlock = async (chain: Chain) => {
  const url = chainUrlMapper[chain];

  const apiKey = scanApiMapper[chain];
  const { data: currentBlockHex } = await axios.get(
    `${url}?module=proxy&action=eth_blockNumber&apikey=${apiKey}`
  );

  const currentBlock = parseInt(currentBlockHex.result, 16);

  return currentBlock;
};

export const fuzzyMatchTokens = async (tokens: TokenType[]) => {
  const tokensInDB = await prisma.coins.findMany({
    select: { code: true },
  });
  const tokenCodesInDB = tokensInDB.map((t) => t.code);
  const tokenNamesInDb: string[] = [];

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
        tokenNamesInDb.push(bestResult.target);
      }
    }
  });

  await Promise.all(promises);

  const tokenNamesNotInDb = tokens.filter(
    (token) => !tokenNamesInDb.includes(token.symbol)
  );

  return { tokenNamesInDb, tokenNamesNotInDb };
};

export const allChainsDecimals: { [key in string]: number } = {
  "eth-mainnet": 18,
  "matic-mainnet": 18,
  "opt-mainnet": 18,
};

export const dateIntervals = (interval: timePeriod) => {
  const today = new Date();
  let startDate: Date;
  if (interval === timePeriod.oneHour) {
    startDate = date(today).subtract(1, "hours").toDate();
  } else if (interval === timePeriod.oneDay) {
    startDate = date(today).subtract(1, "days").toDate();
  } else if (interval === timePeriod.sevenDays) {
    startDate = date(today).subtract(7, "days").toDate();
  } else if (interval === timePeriod.thirtyDays) {
    startDate = date(today).subtract(30, "days").toDate();
  } else if (interval === timePeriod.sixMonths) {
    startDate = date(today).subtract(6, "months").toDate();
  } else if (interval === timePeriod.oneYear) {
    startDate = date(today).subtract(1, "years").toDate();
  } else {
    throw new Error(`Invalid time interval: ${interval}`);
  }

  const start = startDate.getTime();
  const end = today.getTime();

  return { start, end };
};

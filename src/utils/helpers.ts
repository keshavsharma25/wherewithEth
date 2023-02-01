import axios from "axios";
import { go } from "fuzzysort";
import { compareTwoStrings } from "string-similarity";
import { prisma } from "./prismaClient";
import { Chain, timePeriod, TokenType } from "./types";
import date from "moment";

let usedApiKeys: string[] = [];

export const chainUrlMapper: { [key in Chain]: string } = {
  "eth-mainnet": "https://api.etherscan.io/api",
  "matic-mainnet": "https://api.polygonscan.com/api",
  "opt-mainnet": "https://api-optimistic.etherscan.io/api",
  "arb-mainnet": "https://api.arbiscan.io/api",
};

export const scanApiMapper: { [key in Chain]: string } = {
  "eth-mainnet": process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY_LIST as string,
  "matic-mainnet": process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY_LIST as string,
  "opt-mainnet": process.env.NEXT_PUBLIC_OPTIMISTICSCAN_API_KEY_LIST as string,
  "arb-mainnet": process.env.NEXT_PUBLIC_ARBISCAN_API_KEY_LIST as string,
};

export const moralisScanMapper: { [key: string]: string } = {
  "eth-mainnet": "eth",
  "matic-mainnet": "polygon",
};

export const getRandomApiKey = (apiKeys: string): string => {
  const apiKeyList = apiKeys.split(",");

  const apiKey = apiKeyList[Math.floor(Math.random() * apiKeyList.length)];

  if (usedApiKeys.length === apiKeyList.length) {
    usedApiKeys = [];
  } else if (usedApiKeys.includes(apiKey)) {
    return getRandomApiKey(apiKeys);
  } else {
    usedApiKeys.push(apiKey);
  }

  return apiKey;
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

export const fuzzyMatchTokens = async (
  tokens: TokenType[]
): Promise<{
  tokenCodesInDbLCW: string[];
  tokenCodesInDbMoralis: string[];
  tokenCodesNotInDbMoralis: string[];
}> => {
  const tokensInDB = await prisma.coins.findMany({
    select: { code: true },
  });
  const codesInDB = tokensInDB.map((t) => t.code);
  const tokenCodesInDbLCW: string[] = [];
  const tokenCodesInDbMoralis: string[] = [];

  const promises = tokens.map(async (token: TokenType) => {
    const codeResults = go(token?.symbol, codesInDB).filter(
      (result) => result.score > -10
    );

    const codeResultsPercentage = codeResults.map((result) => {
      return {
        ...result,
        score: (1 - Math.abs(result.score) / result.target.length) * 100,
      };
    });

    let bestResult: {
      code_target?: string;
      name_target?: string;
      score: number;
    } = { score: 0 };

    const codePromises = codeResultsPercentage.map(async (result) => {
      const nameInDB = await prisma.coins.findUnique({
        where: { code: result.target },
        select: { name: true },
      });

      let nameResult;
      if (nameInDB) {
        nameResult = compareTwoStrings(nameInDB.name, token.name);
      }
      if (nameResult && nameResult >= 0.6) {
        const combinedResult = result.score * nameResult;
        if (combinedResult > bestResult.score) {
          bestResult = {
            code_target: result.target,
            name_target: nameInDB?.name,
            score: combinedResult,
          };
        }
      }
    });

    await Promise.all(codePromises);

    if (bestResult.score > 0) {
      tokenCodesInDbLCW.push(bestResult.code_target as string);
      tokenCodesInDbMoralis.push(token?.symbol);
    }
  });

  await Promise.all(promises);

  const tokensNotInDb = tokens.filter(
    (token: TokenType) => !tokenCodesInDbMoralis.includes(token?.symbol)
  );

  const tokenCodesNotInDbMoralis = tokensNotInDb.map((token) => {
    return token?.symbol;
  });

  return { tokenCodesInDbLCW, tokenCodesInDbMoralis, tokenCodesNotInDbMoralis };
};

export const allChainsDecimals: { [key in string]: number } = {
  "eth-mainnet": 18,
  "matic-mainnet": 18,
  "opt-mainnet": 18,
};

export const dateIntervals = (interval: timePeriod) => {
  const today = new Date();

  const intervalDict = {
    [timePeriod.oneHour]: date(today).subtract(1, "hours").toDate(),
    [timePeriod.oneDay]: date(today).subtract(1, "days").toDate(),
    [timePeriod.sevenDays]: date(today).subtract(7, "days").toDate(),
    [timePeriod.thirtyDays]: date(today).subtract(30, "days").toDate(),
    [timePeriod.sixMonths]: date(today).subtract(6, "months").toDate(),
    [timePeriod.oneYear]: date(today).subtract(1, "years").toDate(),
  };

  const startDate = intervalDict[interval];

  const start = startDate.getTime();
  const end = today.getTime();

  return { start, end };
};

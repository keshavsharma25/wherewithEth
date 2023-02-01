import { prisma } from "../utils/prismaClient";
import { getERC20Txns, getNativeBalance } from "./etherscanHelpers";
import { allChainsDecimals, dateIntervals, fuzzyMatchTokens } from "./helpers";
import {
  getPlatformPrice,
  getTokenContractPrice,
  getTokensPrices,
} from "./liveCoinWatchHelpers";
import { getToken } from "./moralisHelpers";
import { Chain, timePeriod, TokenType } from "./types";
import BigNumber from "bignumber.js";
import date from "moment";

export const getAllTokenAssets = async (address: string) => {
  const assets = [];
  for (const chain of ["eth-mainnet", "matic-mainnet"]) {
    const chainAssets = await getChainTokenAssets(address, chain as Chain);
    assets.push(...chainAssets);
  }

  return assets;
};

export const getChainTokenAssets = async (address: string, chain: string) => {
  const tokens = await getToken(address, chain);

  const result: any = [];

  try {
    const {
      tokenCodesInDbLCW,
      tokenCodesInDbMoralis,
      tokenCodesNotInDbMoralis,
    } = await fuzzyMatchTokens(tokens);
    const tokensInDB = await prisma.coins.findMany({
      where: {
        code: {
          in: tokenCodesInDbLCW,
        },
      },
    });

    const tokenPrices = await getTokensPrices(tokenCodesInDbLCW);

    if (tokens.length > 0 && tokenPrices) {
      const promises = tokens.map(async (token: TokenType) => {
        if (tokenCodesInDbLCW.includes(token.symbol)) {
          const tokenInDb = tokensInDB.find((t) => t.code === token.symbol);

          if (tokenPrices[token.symbol].rate) {
            const quote = Number(
              (tokenPrices[token.symbol].rate * parseInt(token.balance)) /
                Math.pow(10, token.decimals)
            );

            result.push({
              token_address: token.token_address,
              name: token.name,
              code: token.symbol,
              chain: chain,
              decimals: token.decimals,
              balance: token.balance,
              quote: quote,
              ...tokenPrices[token.symbol],
              age: tokenInDb?.age,
              image: {
                png32: tokenInDb?.png32,
                png64: tokenInDb?.png64,
                webp32: tokenInDb?.webp32,
                webp64: tokenInDb?.webp64,
              },
              categories: tokenInDb?.categories,
            });
          }
        } else {
          const tokenAddress = token.token_address;
          const platform = "eth";

          const tokenPrice = await getTokenContractPrice(
            tokenAddress as string,
            platform
          );

          if (!tokenPrice?.error && tokenPrice.rate) {
            const quote =
              (tokenPrice.rate * parseInt(token.balance)) /
              Math.pow(10, token.decimals);

            result.push({
              token_address: token.token_address,
              name: token.name,
              code: token.symbol,
              chain: chain,
              decimals: token.decimals,
              balance: token.balance,
              quote: quote,
              rate: tokenPrice?.rate,
              volume: tokenPrice?.volume,
              cap: tokenPrice?.cap,
              liquidity: tokenPrice?.liquidity,
              delta: tokenPrice?.delta,
              age: tokenPrice?.age,
              image: {
                png32: tokenPrice?.png32,
                png64: tokenPrice?.png64,
                webp32: tokenPrice?.webp32,
                webp64: tokenPrice?.webp64,
              },
              categories: tokenPrice?.categories
                ? tokenPrice?.categories.join(", ")
                : "",
            });
          }
        }
      });
      await Promise.all(promises);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  return result;
};

export const getNative = async (address: string, chain: string) => {
  const result = [];
  if (chain === "all") {
    for (const chain of Object.keys(allChainsDecimals)) {
      const native = await getNativeBalance(address, chain as any);
      const { nativePrice, code } = await getPlatformPrice(chain as any);

      if (parseInt(native.balance) > 0) {
        const quote = Number(
          (nativePrice.rate * parseInt(native.balance)) /
            Math.pow(10, allChainsDecimals[chain])
        );
        result.push({
          name: nativePrice.name,
          symbol: nativePrice.symbol,
          code: code,
          chain: chain,
          balance: native.balance,
          decimals: allChainsDecimals[chain],
          quote: quote,
          rate: nativePrice.rate,
          volume: nativePrice.volume,
          cap: nativePrice.cap,
          liquidity: nativePrice.liquidity,
          delta: nativePrice.delta,
          allTimeHighUSD: nativePrice.allTimeHighUSD,
          age: nativePrice.age,
          image: {
            png32: nativePrice.png32,
            png64: nativePrice.png64,
            webp32: nativePrice.webp32,
            webp64: nativePrice.webp64,
          },
          categories: nativePrice?.categories
            ? nativePrice?.categories.join(", ")
            : "",
        });
      }
    }
  } else {
    const native = await getNativeBalance(address, chain as Chain);
    const { nativePrice, code } = await getPlatformPrice(chain as Chain);

    const quote = Number(
      (nativePrice.rate * parseInt(native.balance)) /
        Math.pow(10, allChainsDecimals[chain])
    );

    if (parseInt(native.balance) > 0) {
      result.push({
        name: nativePrice.name,
        symbol: nativePrice.symbol,
        code: code,
        chain: chain,
        balance: native.balance,
        decimals: allChainsDecimals[chain],
        quote: quote,
        rate: nativePrice.rate,
        volume: nativePrice.volume,
        cap: nativePrice.cap,
        liquidity: nativePrice.liquidity,
        delta: nativePrice.delta,
        allTimeHighUSD: nativePrice.allTimeHighUSD,
        age: nativePrice.age,
        image: {
          png32: nativePrice.png32,
          png64: nativePrice.png64,
          webp32: nativePrice.webp32,
          webp64: nativePrice.webp64,
        },
        categories: nativePrice?.categories
          ? nativePrice?.categories.join(", ")
          : "",
      });
    }
  }

  return result;
};

export const tokenBalanceHistory = async (
  address: string,
  tokenInfo: TokenType,
  chain: Chain,
  interval: timePeriod
) => {
  const { start, end } = dateIntervals(interval);

  const startSec = Math.round(start / 1000);
  const endSec = Math.round(end / 1000);

  let page = 1;

  const txHistory = await getERC20Txns(
    chain,
    address,
    page,
    100,
    tokenInfo.token_address
  );

  if (txHistory.status === "1") {
    const txHistoryFilter = txHistory?.result?.filter(
      (tx: any) => tx.timeStamp >= startSec && tx.timeStamp <= endSec
    );

    const txList = [...txHistoryFilter];

    let currentBalance = new BigNumber(tokenInfo?.balance);

    const currentTokenBalance = {
      timestamp: Math.round(date.now() / 1000),
      balance: currentBalance.toString(),
      status: "current",
    };

    if (txList.length === 0) {
      return {
        token: tokenInfo?.symbol,
        token_address: tokenInfo?.token_address,
        chain: chain,
        decimals: tokenInfo?.decimals,
        balanceHistory: [currentTokenBalance],
      };
    }

    while (txList.length > 0 && txList.length % 100 === 0) {
      page += 1;
      const txHistory = await getERC20Txns(
        Chain.eth,
        address,
        page,
        100,
        tokenInfo.token_address
      );

      const txHistoryFilter = txHistory?.result.filter(
        (tx: any) => tx.timeStamp >= startSec && tx.timeStamp <= endSec
      );

      if (txHistory?.status === "0") {
        break;
      }

      txList.push(...txHistoryFilter);
    }

    const promises = txList.map((tx: any) => {
      const { timeStamp, from, to, value } = tx;

      if (from.toLowerCase() === address.toLowerCase()) {
        currentBalance = currentBalance.plus(value);

        return {
          timestamp: timeStamp - 1,
          balance: currentBalance.toString(),
          status: "send",
          amount: value.toString(),
          gasUsed: tx.gasUsed,
          gasPrice: tx.gasPrice,
        };
      } else if (to.toLowerCase() === address.toLowerCase()) {
        currentBalance = currentBalance.minus(value);
        return {
          timestamp: timeStamp - 1,
          balance: currentBalance.toString(),
          status: "receive",
          amount: value.toString(),
          gasUsed: tx.gasUsed,
          gasPrice: tx.gasPrice,
        };
      }
    });

    const txBalanceHistory = await Promise.all(promises);

    const tokenBalanceHistory = [currentTokenBalance, ...txBalanceHistory];

    return {
      token: tokenInfo?.symbol,
      token_address: tokenInfo?.token_address,
      chain: chain,
      decimals: tokenInfo?.decimals,
      balanceHistory: tokenBalanceHistory,
    };
  } else {
    console.log("error", txHistory);
    return {
      token: tokenInfo?.symbol,
      token_address: tokenInfo?.token_address,
      chain: chain,
      decimals: tokenInfo?.decimals,
      balanceHistory: [],
    };
  }
};

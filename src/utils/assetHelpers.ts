import { debug } from "console";
import { prisma } from "../utils/prismaClient";
import { getNativeBalance } from "./etherscanHelpers";
import { allChainsDecimals, getQuote } from "./helpers";
import {
  getPlatformPrice,
  getTokenContractPrice,
  getTokensPrices,
} from "./liveCoinWatchHelpers";
import { getToken } from "./moralisHelpers";
import { chains, TokenType } from "./types";

export const getAllTokenAssets = async (address: string) => {
  const assets = [];
  for (const chain of ["eth-mainnet", "matic-mainnet"]) {
    const chainAssets = await getChainTokenAssets(address, chain as chains);
    console.log(chainAssets);
    assets.push(...chainAssets);
  }

  return assets;
};

export const getChainTokenAssets = async (address: string, chain: string) => {
  const tokens = await getToken(address, chain);

  if (tokens.length === 0) {
    return [];
  }

  const result = [];

  try {
    const tokensInDB = await prisma.coins.findMany({
      where: {
        AND: {
          code: {
            in: tokens.map((token: TokenType) => token.symbol),
          },
          name: {
            in: tokens.map((token: TokenType) => token.name),
          },
        },
      },
    });

    const tokenCodesInDB = tokensInDB.map((t) => t.code);

    console.log(tokenCodesInDB);

    const tokenPrices = await getTokensPrices(tokenCodesInDB);

    for (const token of tokens) {
      if (
        tokenCodesInDB.includes(token.symbol) &&
        tokenPrices[token.symbol]?.rate
      ) {
        const tokenInDb = tokensInDB.find((t) => t.code === token.symbol);

        const quote = await getQuote(
          token.balance,
          token.decimals,
          tokenPrices[token.symbol]?.rate ? tokenPrices[token.symbol].rate : 0
        );

        result.push({
          token_address: token.token_address,
          name: token.name,
          code: token.symbol,
          decimals: token.decimals,
          balance: token.balance,
          quote: quote,
          age: tokenInDb?.age,
          color: tokenInDb?.color,
          image: {
            png32: tokenInDb?.png32,
            png64: tokenInDb?.png64,
            webp32: tokenInDb?.webp32,
            webp64: tokenInDb?.webp64,
          },
          categories: tokenInDb?.categories,
          ...tokenPrices[token.symbol],
        });
      } else {
        const tokenAddress = token.token_address;
        const platform = "eth";

        const tokenPrice = await getTokenContractPrice(
          tokenAddress as string,
          platform
        );

        console.log("token Address: ", tokenAddress);
        console.log("tokenPrice: ", tokenPrice);

        if (tokenPrice.rate) {
          const quote = await getQuote(
            token.balance,
            token.decimals,
            tokenPrices[token.symbol]?.rate ? tokenPrices[token.symbol].rate : 0
          );

          if (quote === null || quote === undefined || quote === 0) {
            continue;
          }

          result.push({
            token_address: token.token_address,
            name: token.name,
            code: token.symbol,
            decimals: token.decimals,
            balance: token.balance,
            quote: await getQuote(
              token.balance,
              token.decimals,
              tokenPrice?.rate
            ),
            age: tokenPrice?.age,
            color: tokenPrice?.color,
            image: {
              png32: tokenPrice?.png32,
              png64: tokenPrice?.png64,
              webp32: tokenPrice?.webp32,
              webp64: tokenPrice?.webp64,
            },
            categories: tokenPrice?.categories
              ? tokenPrice?.categories.join(", ")
              : "",
            rate: tokenPrice?.rate,
            volume: tokenPrice?.volume,
            cap: tokenPrice?.cap,
            liquidity: tokenPrice?.liquidity,
            delta: tokenPrice?.delta,
          });
        }
      }
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
      const nativePrice = await getPlatformPrice(chain as any);

      if (parseInt(native.balance) > 0) {
        result.push({
          name: nativePrice.name,
          symbol: nativePrice.symbol,
          balance: native.balance,
          quote: await getQuote(
            native.balance,
            allChainsDecimals[chain],
            nativePrice.rate
          ),
          decimals: allChainsDecimals[chain],
          age: nativePrice.age,
          color: nativePrice.color,
          image: {
            png32: nativePrice.png32,
            png64: nativePrice.png64,
            webp32: nativePrice.webp32,
            webp64: nativePrice.webp64,
          },
          categories: nativePrice?.categories
            ? nativePrice?.categories.join(", ")
            : "",
          allTimeHighUSD: nativePrice.allTimeHighUSD,
          rate: nativePrice.rate,
          volume: nativePrice.volume,
          cap: nativePrice.cap,
          liquidity: nativePrice.liquidity,
          delta: nativePrice.delta,
        });
      }
    }
  } else {
    console.log(chain);
    const native = await getNativeBalance(address, chain as chains);
    const nativePrice = await getPlatformPrice(chain as chains);

    if (parseInt(native.balance) > 0) {
      result.push({
        name: nativePrice.name,
        symbol: nativePrice.symbol,
        balance: native.balance,
        decimals: allChainsDecimals[chain],
        quote: await getQuote(
          native.balance,
          allChainsDecimals[chain],
          nativePrice.rate
        ),
        age: nativePrice.age,
        color: nativePrice.color,
        image: {
          png32: nativePrice.png32,
          png64: nativePrice.png64,
          webp32: nativePrice.webp32,
          webp64: nativePrice.webp64,
        },
        categories: nativePrice?.categories
          ? nativePrice?.categories.join(", ")
          : "",
        allTimeHighUSD: nativePrice.allTimeHighUSD,
        rate: nativePrice.rate,
        volume: nativePrice.volume,
        cap: nativePrice.cap,
        liquidity: nativePrice.liquidity,
        delta: nativePrice.delta,
      });
    }
  }

  return result;
};

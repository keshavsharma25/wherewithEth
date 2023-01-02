import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Token, Assets } from "../../types";

const start = async () => {
  try {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const BASE_URL = "https://deep-index.moralis.io/api/v2/";

const getToken = async (address: string, chain: EvmChain) => {
  const url = `${BASE_URL}${address}/erc20`;

  const options = {
    method: "GET",
    params: { chain: "eth" },
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
    },
  };

  const response = await fetch(url, options);

  return response.json();
};

const getNativeBalance = async (address: string, chain: EvmChain) => {
  const url = `${BASE_URL}${address}/balance`;

  const options = {
    method: "GET",
    params: { chain: "eth" },
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
    },
  };

  const response = await fetch(url, options);

  return response.json();
};

const getTokenPrice = async (address: string) => {
  const url = `${BASE_URL}erc20/${address}/price`;

  const options = {
    method: "GET",
    // params: { chain: chain },
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
    },
  };

  const response = await fetch(url, options);

  return response.json();
};

const getNativePrice = async (tempNativeBalance: {
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
}) => {
  const ethPrice = (
    await getTokenPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
  ).usdPrice;

  const nativeBalance: Token = {
    name: tempNativeBalance.chain._chainlistData.nativeCurrency.name,
    symbol: tempNativeBalance.chain._chainlistData.nativeCurrency.symbol,
    logo: null,
    thumbnail: null,
    decimals: tempNativeBalance.chain._chainlistData.nativeCurrency.decimals,
    balance: tempNativeBalance.balance,
    quote_rate: ethPrice,
    quote:
      (Number(tempNativeBalance.balance) /
        10 ** tempNativeBalance.chain._chainlistData.nativeCurrency.decimals) *
      ethPrice,
  };

  return nativeBalance;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const chain = EvmChain.ETHEREUM;
    let totalBalance = 0;

    if (typeof req.query.address === "string") {
      const tokens = await getToken(req.query.address, chain);
      const tempNativeBalance = await getNativeBalance(
        req.query.address,
        chain
      );
      tempNativeBalance["chain"] = chain;

      const nativeBalance = await getNativePrice(tempNativeBalance);

      totalBalance += nativeBalance.quote;

      if (tokens) {
        for (let i = 0; i < tokens.length; i++) {
          tokens[i].quote_rate = (
            await getTokenPrice(tokens[i].token_address)
          ).usdPrice;
          tokens[i].quote =
            (tokens[i].quote_rate * tokens[i].balance) /
            10 ** tokens[i].decimals;

          if (tokens[i].quote_rate) {
            totalBalance += tokens[i].quote;
          }
        }

        tokens.unshift(nativeBalance);
      }

      const data: Assets = {
        address: req.query.address,
        chainId: tempNativeBalance.chain._chainlistData.chainId,
        updated_at: new Date(),
        quote_currency: "USD",
        total_balance: totalBalance,
        items: tokens,
      };

      return res.status(200).json(data);
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;

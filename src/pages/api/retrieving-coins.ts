import Moralis from "moralis";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllTokenAssets,
  getChainTokenAssets,
  getNative,
} from "../../utils/assetHelpers";
import { chains } from "../../utils/types";
import redis from "../../utils/redis";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, chain } = req.query;
    let native;
    let tokens;
    let totalNetWorth = 0;

    if (chain === "all") {
      let allCoins = JSON.parse(
        (await redis.get(`allCoins-${address}`)) as string
      );

      if (!allCoins) {
        native = await getNative(address as string, chain as chains);
        tokens = await getAllTokenAssets(address as string);

        const result = [...native, ...tokens];

        for (const token of result) {
          totalNetWorth += Number(token.quote);
        }

        allCoins = {
          address: address as string,
          chain: chain as chains,
          networth: totalNetWorth,
          assets: result,
        };

        await redis.set(
          `allCoins-${address}`,
          JSON.stringify(allCoins),
          "EX",
          60 * 15
        );
      }

      res.status(200).json(allCoins);
    } else {
      let chainCoins = JSON.parse(
        (await redis.get(`${chain}Coins-${address}`)) as string
      );

      if (!chainCoins) {
        native = await getNative(address as string, chain as chains);
        tokens = await getChainTokenAssets(address as string, chain as chains);

        const result = [...native, ...tokens];

        for (const token of result) {
          totalNetWorth += Number(token.quote);
        }

        chainCoins = {
          address: address as string,
          chain: chain as chains,
          networth: totalNetWorth,
          assets: result,
        };

        await redis.set(
          `${chain}Coins-${address}`,
          JSON.stringify(chainCoins),
          "EX",
          60 * 15
        );
      }

      res.status(200).json(chainCoins);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default handler;

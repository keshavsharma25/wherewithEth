import Moralis from "moralis";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllTokenAssets,
  getChainTokenAssets,
  getNative
} from "../../utils/assetHelpers";
import { chains } from "../../utils/types";

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
      native = await getNative(address as string, chain as chains);
      tokens = await getAllTokenAssets(address as string);

      const result = [...native, ...tokens];
      console.log("len of result: ", result.length);

      for (const token of result) {
        totalNetWorth += Number(token.quote);
      }

      res.status(200).json({
        address: address as string,
        chain: chain as chains,
        networth: totalNetWorth,
        assets: result,
      });
    } else {
      native = await getNative(address as string, chain as chains);
      tokens = await getChainTokenAssets(address as string, chain as chains);

      const result = [...native, ...tokens];

      for (const token of result) {
        totalNetWorth += Number(token.quote);
      }

      res.status(200).json({
        address: address as string,
        chain: chain as chains,
        networth: totalNetWorth,
        assets: result,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default handler;

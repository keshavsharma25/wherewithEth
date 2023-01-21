import type { NextApiRequest, NextApiResponse } from "next";
import {
  getTokenContractPrice,
  getTokenPrice,
} from "../../utils/liveCoinWatchHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const token = await getAllTokenAssets(
  //   "0x524C91dd7902827cb51119F018FD560237985d3A"
  // );

  try {
    const tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    const tokenContract = await getTokenContractPrice(tokenAddress, "ETH");
    const tokenPrice = await getTokenPrice("ETH", "USD");

    res.status(200).json(tokenPrice);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

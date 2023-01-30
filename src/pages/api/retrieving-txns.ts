import type { NextApiRequest, NextApiResponse } from "next";
import {
  getERC20Txns,
  getNormalTxns,
  getERC721Txns,
  getERC1155Txns,
} from "../../utils/etherscanHelpers";
import { Chain } from "../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, chain, page, limit, category } = req.query;

    switch (category) {
      case "normal":
        const txns = await getNormalTxns(
          chain as Chain,
          address as string,
          parseInt(page as string) as number,
          parseInt(limit as string) as number
        );
        res.status(200).json(txns);
        break;
      case "erc20":
        const erc20Txns = await getERC20Txns(
          chain as Chain,
          address as string,
          parseInt(page as string) as number,
          parseInt(limit as string) as number
        );
        res.status(200).json(erc20Txns);
        break;
      case "erc721":
        const erc721Txns = await getERC721Txns(
          chain as Chain,
          address as string,
          parseInt(page as string) as number,
          parseInt(limit as string) as number
        );
        res.status(200).json(erc721Txns);
        break;
      case "erc1155":
        const erc1155Txns = await getERC1155Txns(
          chain as Chain,
          address as string,
          parseInt(page as string) as number,
          parseInt(limit as string) as number
        );
        res.status(200).json(erc1155Txns);
        break;
      default:
        const defaultTxns = await getNormalTxns(
          chain as Chain,
          address as string,
          parseInt(page as string) as number,
          parseInt(limit as string) as number
        );
        res.status(200).json(defaultTxns);
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default handler;

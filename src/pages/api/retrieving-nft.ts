import type { NextApiRequest, NextApiResponse } from "next";
import { getNfts, chainAlchemyApiMapper } from "../../utils/alchemyHelpers";
import { Chain as chains, NftInformation, NftType } from "../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, chain, pageKey } = req.query;

  try {
    const apiKey = chainAlchemyApiMapper[chain as chains];

    const allNfts = await getNfts(
      address as string,
      chain as chains,
      apiKey as string,
      pageKey ? (pageKey as string) : undefined
    );

    const nfts: NftInformation[] = allNfts?.ownedNfts?.map((nft: any) => {
      return {
        contract: {
          address: nft.contract.address,
          tokenType: nft.contract.tokenType,
        },
        tokenId: nft.tokenId,
        tokenType: nft.tokenType,
        title: nft.title,
        description: nft.description,
        contractMetadata: nft.contractMetadata,
        media: nft.media,
      };
    });

    const results: NftType = {
      chain: chain as chains,
      pageKey: allNfts.pageKey ? allNfts.pageKey : null,
      totalCount: allNfts.totalCount,
      chainNfts: nfts,
    };

    res.status(200).json(allNfts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default handler;

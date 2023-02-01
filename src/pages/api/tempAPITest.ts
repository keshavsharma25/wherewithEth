import type { NextApiRequest, NextApiResponse } from "next";
import { tokenBalanceHistory } from "../../utils/assetHelpers";
import { fuzzyMatchTokens } from "../../utils/helpers";
import { getToken } from "../../utils/moralisHelpers";
import { Chain, timePeriod, TokenType } from "../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = "0x34aa3f359a9d614239015126635ce7732c18fdf3";
  const chains = [Chain.eth, Chain.matic];

  let index = 0;
  let balHistory: any = [];

  const fetchData = async () => {
    if (index === chains.length) {
      res.status(200).json(balHistory);
      return;
    }

    const chain = chains[index];
    const chainTokens = await getToken(address, chain);

    const { tokenCodesInDbMoralis } = await fuzzyMatchTokens(chainTokens);

    const chainTokensInDb = chainTokens.filter((token: TokenType) => {
      return tokenCodesInDbMoralis.includes(token.symbol);
    });

    // const chunkSize = 15;
    // const tokenChunks = [];
    // for (let i = 0; i < chainTokensInDb.length; i += chunkSize) {
    //   tokenChunks.push(chainTokensInDb.slice(i, i + chunkSize));
    // }

    // for await (const chunk of tokenChunks) {
    const promises = chainTokensInDb.map(async (token: TokenType) => {
      console.log("Token Name:", token.symbol);

      const history = await tokenBalanceHistory(
        address,
        token,
        chain,
        timePeriod.thirtyDays
      );
      return history;
    });

    const history = await Promise.all(promises);
    balHistory.push(...history);
    // }

    index++;
    fetchData();
  };

  fetchData();
};

export default handler;

/* const txHistory = await tokensInDb.map(async (token: TokenType) => {
  const data = await getTokenHistory(
    token.symbol,
    timePeriod.oneDay,
    "USD"
  );

  const txList = [];

  while (txList.length > 0 && txList[-1].timestamp > data.history.date) {
    const tx = await getERC20Txns(
      chain,
      address,
      1,
      100,
      token.token_address
    );

    txList.push(...tx.result);
  }

  return {
    token: token.symbol,
    quoteHistory: data.history,
    tx: txList,
  };
});

console.log(txHistory.length);
} */

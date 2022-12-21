import type { NextApiRequest, NextApiResponse } from "next";

interface CoinItem {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: string[];
  balance: string;
  balance_24h: string;
  balance_percent_change_24h: string;
  quote_rate: number;
  quote_rate_24h: number;
  quote_rate_percent_change_24h: number;
  quote: number;
  quote_24h: number;
  quote_percent_change_24h: number;
  logo_url: string;
  nft_data: string[] | null;
}

interface UserAssets {
  address: string;
  updated_at: string;
  quote_currency: string;
  chain_id: number;
  total_balance: number;
  items: CoinItem[];
}

const percentChange = (max: number, min: number) => {
  return ((max - min) / min) * 100;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const coinsResponse = await (
      await fetch(
        `https://api.covalenthq.com/v1/${req.query.chain_id}/address/${req.query.address}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}/?quote-currency=${req.query.quote_currency}`,
        { headers }
      )
    ).json();

    let coinsData = [];
    let totalBalance = 0;

    for (let i = 0; i < coinsResponse.data.items.length; i++) {
      const coinData = coinsResponse.data.items[i];

      if (coinData.quote_rate === 0) {
        continue;
      } else {
        totalBalance += Number(coinData.quote);
      }

      coinsData.push({
        contract_decimals: coinData.contract_decimals,
        contract_name: coinData.contract_name,
        contract_ticker_symbol: coinData.contract_ticker_symbol,
        contract_address: coinData.contract_address,
        supports_erc: coinData.supports_erc,
        balance: coinData.balance,
        balance_24h: coinData.balance_24h,
        balance_percent_change_24h: String(
          percentChange(Number(coinData.balance), Number(coinData.balance_24h))
        ),
        quote_rate: coinData.quote_rate,
        quote_rate_24h: coinData.quote_rate_24h,
        quote_rate_percent_change_24h: percentChange(
          Number(coinData.quote_rate),
          Number(coinData.quote_rate_24h)
        ),
        quote: coinData.quote,
        quote_24h: coinData.quote_24h,
        quote_percent_change_24h: percentChange(
          Number(coinData.quote),
          Number(coinData.quote_24h)
        ),
        logo_url: coinData.logo_url,
        nft_data: coinData.nft_data,
      } as CoinItem);
    }

    let userAssets: UserAssets = {
      address: coinsResponse.data.address,
      updated_at: coinsResponse.data.updated_at,
      quote_currency: coinsResponse.data.quote_currency,
      chain_id: coinsResponse.data.chain_id,
      total_balance: totalBalance,
      items: coinsData,
    };

    return res.status(200).json(userAssets);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;

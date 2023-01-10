export const getTokensPrices = async (
  codes: string[],
  currency: string = "USD",
  sort: string = "rank",
  order: string = "ascending",
  offset: number = 0,
  limit: number = 100,
  meta: boolean = false
) => {
  const url = "https://api.livecoinwatch.com/coins/map";
  const headers = {
    "content-type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_LIVECOINWATCH_API_KEY!,
  };
  const body = JSON.stringify({
    codes: codes,
    currency: currency,
    sort: sort,
    order: order,
    offset: offset,
    limit: limit,
    meta: meta,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const response = await fetch(url, options);
  const tokensPrices = await response.json();
  const result: {
    [key: string]: {
      rate: number;
      volume: number;
      cap: number;
      liquidity?: number;
      delta: {
        hour: number;
        day: number;
        week: number;
        month: number;
        quarter: number;
        year: number;
      };
    };
  } = {};

  for (const item of tokensPrices) {
    result[item.code] = {
      rate: item.rate,
      volume: item.volume,
      cap: item.cap,
      liquidity: item.liquidity,
      delta: item.delta,
    };
  }

  return result;
};

export const getTokenPrice = async (
  code: string,
  currency: string = "USD",
  meta: boolean = false
) => {
  const url = "https://api.livecoinwatch.com/coins/single";
  const headers = {
    "content-type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_LIVECOINWATCH_API_KEY!,
  };
  const body = JSON.stringify({
    currency: currency,
    code: code,
    meta: meta,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const getTokenContractPrice = async (
  address: string,
  platform: string,
  currency: string = "USD",
  meta: boolean = true
) => {
  const url = "https://api.livecoinwatch.com/coins/contract";
  const headers = {
    "content-type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_LIVECOINWATCH_API_KEY!,
  };
  const body = JSON.stringify({
    currency: currency,
    platform: platform,
    address: address,
    meta: meta,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};

export const getPlatformPrice = async (platform: string) => {
  switch (platform) {
    case "eth-mainnet":
      return await getTokenPrice("ETH", "USD", true);
    case "matic-mainnet":
      return await getTokenPrice("MATIC", "USD", true);
    case "opt-mainnet":
      return await getTokenPrice("OP", "USD", true);
    default:
      return null;
  }
};

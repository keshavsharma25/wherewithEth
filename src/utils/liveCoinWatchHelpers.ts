export const getTokensPrices = async (
  codes: string[],
  currency: string = "USD",
  sort: string = "rank",
  order: string = "ascending",
  offset: number = 0,
  limit: number = 100,
  meta: boolean = false
) => {
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

  const url = "https://api.livecoinwatch.com/coins/map";
  const headers = {
    "content-type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_LIVECOINWATCH_API_KEY!,
  };
  const body = JSON.stringify({
    codes: codes.slice(0, 100),
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

  if (tokensPrices.length > 0) {
    tokensPrices.map((token: any) => {
      result[token.code] = {
        rate: token.rate,
        volume: token.volume,
        cap: token.cap,
        liquidity: token?.liquidity,
        delta: token.delta,
      };
    });
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
      return {
        nativePrice: await getTokenPrice("ETH", "USD", true),
        code: "ETH",
      };
    case "matic-mainnet":
      return {
        nativePrice: await getTokenPrice("MATIC", "USD", true),
        code: "MATIC",
      };
    case "opt-mainnet":
      return {
        nativePrice: await getTokenPrice("OP", "USD", true),
        code: "OP",
      };
    default:
      return {
        nativePrice: null,
        code: null,
      };
  }
};

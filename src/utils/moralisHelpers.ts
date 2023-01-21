import axios from "axios";
import { moralisScanMapper } from "./helpers";

export const getToken = async (address: string, chain: string) => {
  const BASE_URL = "https://deep-index.moralis.io/api/v2/";

  const url = `${BASE_URL}${address}/erc20?chain=${moralisScanMapper[chain]}`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
    },
  };

  const { data } = await axios.get(url, options);

  return data;
};

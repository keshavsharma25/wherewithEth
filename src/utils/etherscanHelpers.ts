import { chainUrlMapper, getCurrentBlock } from "./helpers";
import { chains } from "./types";

export const scanApiMapper: { [key in chains]: string } = {
  "eth-mainnet": process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string,
  "matic-mainnet": process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY as string,
  "opt-mainnet": process.env.NEXT_PUBLIC_OPTIMISTICSCAN_API_KEY as string,
  "arb-mainnet": process.env.NEXT_PUBLIC_ARBISCAN_API_KEY as string,
};

export const getNormalTxns = async (
  chain: chains,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = scanApiMapper[chain];
  const currentBlock = await getCurrentBlock(chain);
  const url = chainUrlMapper[chain];

  const params = new URLSearchParams();
  params.append("module", "account");
  params.append("action", "txlist");
  params.append("address", address);
  params.append("startblock", "0");
  params.append(
    "endblock",
    currentBlock ? currentBlock.toString() : "99999999"
  );
  params.append("page", page.toString());
  params.append("offset", offset.toString());
  params.append("sort", "desc");
  params.append("apikey", apiKey as string);

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(url + "?" + params.toString(), options);
  const data = await response.json();

  return data;
};

export const getERC20Txns = async (
  chain: chains,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = scanApiMapper[chain];
  const currentBlock = await getCurrentBlock(chain);
  const url = chainUrlMapper[chain];

  const params = new URLSearchParams();

  params.append("module", "account");
  params.append("action", "tokentx");
  params.append("address", address);
  params.append("startblock", "0");
  params.append(
    "endblock",
    currentBlock ? currentBlock.toString() : "99999999"
  );
  params.append("page", page.toString());
  params.append("offset", offset.toString());
  params.append("sort", "desc");
  params.append("apikey", apiKey as string);

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(url + "?" + params.toString(), options);
  const data = await response.json();

  return data;
};

export const getERC721Txns = async (
  chain: chains,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = scanApiMapper[chain];
  const currentBlock = await getCurrentBlock(chain);
  const url = chainUrlMapper[chain];

  const params = new URLSearchParams();

  params.append("module", "account");
  params.append("action", "tokennfttx");
  params.append("address", address);
  params.append("startblock", "0");
  params.append(
    "endblock",
    currentBlock ? currentBlock.toString() : "99999999"
  );
  params.append("page", page.toString());
  params.append("offset", offset.toString());
  params.append("sort", "desc");
  params.append("apikey", apiKey as string);

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  console.log(url + "?" + params.toString());

  const response = await fetch(url + "?" + params.toString(), options);
  const data = await response.json();

  return data;
};

export const getERC1155Txns = async (
  chain: chains,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = scanApiMapper[chain];
  const currentBlock = await getCurrentBlock(chain);
  const url = chainUrlMapper[chain];

  const params = new URLSearchParams();
  params.append("module", "account");
  params.append("action", "token1155tx");
  params.append("address", address);
  params.append("startblock", "0");
  params.append(
    "endblock",
    currentBlock ? currentBlock.toString() : "99999999"
  );
  params.append("page", page.toString());
  params.append("offset", offset.toString());
  params.append("sort", "desc");
  params.append("apikey", apiKey as string);

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(url + "?" + params.toString(), options);
  const data = await response.json();

  return data;
};

import axios from "axios";
import {
  chainUrlMapper,
  getCurrentBlock,
  moralisScanMapper,
  scanApiMapper,
} from "./helpers";
import { chains } from "./types";

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

  const { data } = await axios.get(url + "?" + params.toString(), options);

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

  const { data } = await axios.get(url + "?" + params.toString(), options);

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

  const { data } = await axios.get(url + "?" + params.toString(), options);

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

  const { data } = await axios.get(url + "?" + params.toString(), options);

  return data;
};

export const getNativeBalance = async (address: string, chain: string) => {
  const url = chainUrlMapper[chain as chains];
  const apiKey = scanApiMapper[chain as chains];

  const params = new URLSearchParams();

  params.append("module", "account");
  params.append("action", "balance");
  params.append("address", address);
  params.append("tag", "latest");
  params.append("apikey", apiKey);

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: headers,
  };

  const { data } = await axios.get(url + "?" + params.toString(), options);

  return {
    chain: chain,
    address: address,
    status: data.status,
    balance: data.result,
  };
};

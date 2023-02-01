import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders,
} from "axios";
import rateLimitedAxios from "./axiosRateLimit";
import {
  chainUrlMapper,
  getCurrentBlock,
  getRandomApiKey,
  scanApiMapper,
} from "./helpers";
import { Chain } from "./types";

export const getNormalTxns = async (
  chain: Chain,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = getRandomApiKey(scanApiMapper[chain]);
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

  interface AxiosHeaders extends RawAxiosRequestHeaders {
    accept: string;
    "Content-Type": string;
  }

  const headers: AxiosHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url: url + "?" + params.toString(),
    method: "GET",
    headers: headers,
  };

  const response = await rateLimitedAxios(config);

  return response.data;
};

export const getERC20Txns = async (
  chain: Chain,
  address: string,
  page: number,
  offset: number,
  contractAddress?: string
) => {
  const apiKey = getRandomApiKey(scanApiMapper[chain]);
  const currentBlock = await getCurrentBlock(chain);
  const url = chainUrlMapper[chain];

  const params = new URLSearchParams();

  params.append("module", "account");
  params.append("action", "tokentx");
  params.append("address", address);
  if (contractAddress) {
    params.append("contractaddress", contractAddress);
  }
  params.append("startblock", "0");
  params.append(
    "endblock",
    currentBlock ? currentBlock.toString() : "99999999"
  );
  params.append("page", page.toString());
  params.append("offset", offset.toString());
  params.append("sort", "desc");
  params.append("apikey", apiKey as string);

  interface AxiosHeaders extends RawAxiosRequestHeaders {
    accept: string;
    "Content-Type": string;
  }

  const headers: AxiosHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url: url + "?" + params.toString(),
    method: "GET",
    headers: headers,
  };

  const response = await rateLimitedAxios(config);

  return response?.data;
};

export const getERC721Txns = async (
  chain: Chain,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = getRandomApiKey(scanApiMapper[chain]);
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

  interface AxiosHeaders extends RawAxiosRequestHeaders {
    accept: string;
    "Content-Type": string;
  }

  const headers: AxiosHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url: url + "?" + params.toString(),
    method: "GET",
    headers: headers,
  };

  const response = await rateLimitedAxios(config);

  return response.data;
};

export const getERC1155Txns = async (
  chain: Chain,
  address: string,
  page: number,
  offset: number
) => {
  const apiKey = getRandomApiKey(scanApiMapper[chain]);
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

  interface AxiosHeaders extends RawAxiosRequestHeaders {
    accept: string;
    "Content-Type": string;
  }

  const headers: AxiosHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url: url + "?" + params.toString(),
    method: "GET",
    headers: headers,
  };

  const response = await rateLimitedAxios(config);

  return response.data;
};

export const getNativeBalance = async (address: string, chain: Chain) => {
  const url = chainUrlMapper[chain];
  const apiKey = getRandomApiKey(scanApiMapper[chain]);

  const params = new URLSearchParams();

  params.append("module", "account");
  params.append("action", "balance");
  params.append("address", address);
  params.append("tag", "latest");
  params.append("apikey", apiKey);

  interface AxiosHeaders extends RawAxiosRequestHeaders {
    accept: string;
    "Content-Type": string;
  }

  const headers: AxiosHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url: url + "?" + params.toString(),
    method: "GET",
    headers: headers,
  };

  const response = await rateLimitedAxios(config);
  return {
    chain: chain,
    address: address,
    status: response.data.status,
    balance: response.data.result,
  };
};

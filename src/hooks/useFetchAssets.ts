import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchAssets = async (address: `0x${string}`) => {
  const res = await fetch(
    `./api/retrieving-coins/?address=${address}&chain=all`
  );
  return await res.json();
};
export const useFetchAssets = () => {
  const { address, isConnected } = useAccount();
  return useQuery({
    queryKey: ["assets", address],
    queryFn: async () => await fetchAssets(address!),
    enabled: isConnected,
  });
};

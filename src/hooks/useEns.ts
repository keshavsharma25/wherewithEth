import { useEnsName } from "wagmi";

export function useEns(address: `0x${string}`) {
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  return {
    data,
    isError,
    isLoading,
  };
}

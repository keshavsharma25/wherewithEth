import { Select } from "@chakra-ui/react";

type ChainSelectorProps = {
  setChain: (value: string) => void;
  ref?: React.LegacyRef<HTMLSelectElement>;
};

export function ChainSelector({ setChain, ref }: ChainSelectorProps) {
  const selectHandler = (e: any) => {
    setChain(e.target.value);
  };
  return (
    <Select ref={ref} onChange={selectHandler} color="white" w="max">
      <option color="black" defaultChecked value="eth-mainnet">
        Ethereum
      </option>
      <option color="black" value="matic-mainnet">
        Polygon
      </option>
      <option color="black" value="opt-mainnet">
        Optimism
      </option>
      <option color="black" value="arb-mainnet">
        Arbitrum
      </option>
    </Select>
  );
}

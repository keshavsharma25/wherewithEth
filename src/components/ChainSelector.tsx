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
      <option color="white" defaultChecked value="eth-mainnet">
        Ethereum
      </option>
      <option style={{ backgroundColor: "#1B1D30" }} value="matic-mainnet">
        Polygon
      </option>
      <option style={{ backgroundColor: "#1B1D30" }} value="opt-mainnet">
        Optimism
      </option>
      <option style={{ backgroundColor: "#1B1D30" }} value="arb-mainnet">
        Arbitrum
      </option>
    </Select>
  );
}

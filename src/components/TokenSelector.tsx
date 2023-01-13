import { Select } from "@chakra-ui/react";

type TokenSelectorProps = {
  setTxnsType: (value: string) => void;
  ref?: React.LegacyRef<HTMLSelectElement>;
};

export function TokenSelector({ setTxnsType, ref }: TokenSelectorProps) {
  const txnsTypeHandler = (e: any) => {
    setTxnsType(e.target.value);
  };
  return (
    <Select
      ref={ref}
      onChange={(e) => txnsTypeHandler(e)}
      color="white"
      w="max"
    >
      <option color="black" defaultChecked value="erc20">
        erc-20
      </option>
      <option color="black" value="normal">
        Normal
      </option>

      <option color="black" value="erc721">
        erc-721
      </option>
      <option color="black" value="erc1155">
        erc-1155
      </option>
    </Select>
  );
}

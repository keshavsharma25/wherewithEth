import { Select } from "@chakra-ui/react";

type optionType = {
  value: string;
  label: string;
};
interface ChainSelectorProps {
  setChain: (value: string) => void;
  ref?: React.LegacyRef<HTMLSelectElement>;
  options: optionType[];
}

export function ChainSelector({ setChain, ref, options }: ChainSelectorProps) {
  const selectHandler = (e: any) => {
    setChain(e.target.value);
  };
  return (
    <Select ref={ref} onChange={selectHandler} color="white" w="max">
      {options.map((option, index) => (
        <option
          key={index}
          color="white"
          defaultChecked={index === 1}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
}

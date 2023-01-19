import {
  Box,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEns } from "../../hooks";
export const Transactions = ({
  data,
  setChain,
  setTxnsType,
}: {
  data: any;
  setChain: (e: any) => void;
  setTxnsType: (e: any) => void;
}) => {
  const router = useRouter();
  const selectedChainref = useRef<HTMLSelectElement>(null);
  const selectedTxnsType = useRef<HTMLSelectElement>(null);

  const chainHandler = (e: any) => {
    setChain(e.target.value);
  };

  const txnsTypeHandler = (e: any) => {
    setTxnsType(e.target.value);
  };

  return (
    <Box
      mt={6}
      bg="#1B1D30"
      p={3}
      display={{ base: "none", sm: "block" }}
      borderRadius="12px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
          Transactions
        </Text>
        <Flex float="right" gap={5}>
          <Select
            onChange={(e) => txnsTypeHandler(e)}
            color="white"
            w="max"
            ref={selectedTxnsType}
          >
            <option
              style={{ backgroundColor: "#1B1D30" }}
              defaultChecked
              value="erc20"
            >
              erc-20
            </option>
            <option style={{ backgroundColor: "#1B1D30" }} value="normal">
              Normal
            </option>

            <option style={{ backgroundColor: "#1B1D30" }} value="erc721">
              erc-721
            </option>
            <option style={{ backgroundColor: "#1B1D30" }} value="erc1155">
              erc-1155
            </option>
          </Select>
          {/* <TokenSelector
            ref={selectedTxnsType}
            setTxnsType={(value) => txnsTypeHandler(value)}
          /> */}
          <Select
            ref={selectedChainref}
            onChange={(e) => chainHandler(e)}
            color="white"
            w="max"
          >
            <option
              style={{ backgroundColor: "#1B1D30" }}
              defaultChecked
              value="eth-mainnet"
            >
              Ethereum
            </option>
            <option
              style={{ backgroundColor: "#1B1D30" }}
              value="matic-mainnet"
            >
              Polygon
            </option>
            <option style={{ backgroundColor: "#1B1D30" }} value="opt-mainnet">
              Optimism
            </option>
            <option style={{ backgroundColor: "#1B1D30" }} value="arb-mainnet">
              Arbitrum
            </option>
          </Select>
          {/* <ChainSelector
            ref={selectedChainref}
            setChain={(value) => chainHandler(value)}
          /> */}
        </Flex>
      </Flex>
      <Table
        bg="#111320"
        border="1px"
        borderColor="rgba(255, 255, 255, 0.04)"
        p={2}
        mt={5}
        borderRadius="16px"
        overflow="hidden"
      >
        <Thead bg="#1B1D30" color="#647087">
          <Tr>
            <Th fontSize="0.7rem">Txn. Hash</Th>
            {selectedTxnsType.current?.value === "normal" && (
              <Th fontSize="0.7rem">Method</Th>
            )}
            <Th fontSize="0.7rem">From</Th>
            <Th fontSize="0.7rem">To</Th>
            {selectedTxnsType.current?.value === "erc20" ||
            selectedTxnsType.current?.value === "normal" ? (
              <Th fontSize="0.7rem">Value</Th>
            ) : (
              <Th fontSize="0.7rem">Token</Th>
            )}
          </Tr>
        </Thead>
        <Tbody color="white">
          {data &&
            data?.map((item: any, index: number) => (
              <Tr key={index}>
                <Td
                  onClick={() =>
                    router.push(
                      selectedChainref.current?.value === "matic-mainnet"
                        ? `https://polygonscan.com/tx/${item.hash}`
                        : `https://etherscan.io/tx/${item.hash}`
                    )
                  }
                  _hover={{ cursor: "pointer", color: "white" }}
                >
                  {item.hash.slice(0, 7)}
                </Td>
                {selectedTxnsType.current?.value === "normal" && (
                  <Td>
                    <Box
                      p={1}
                      rounded="md"
                      textAlign="center"
                      bg={
                        item?.functionName?.toLowerCase().slice(0, 8) ===
                          "transfer" || item?.functionName === ""
                          ? "rgba(53,218,178,0.08)"
                          : "purple.700"
                      }
                      color={
                        item?.functionName?.toLowerCase().slice(0, 8) ===
                          "transfer" || item?.functionName === ""
                          ? "#35DAB2"
                          : "purple.700"
                      }
                    >
                      {item?.functionName === "" ||
                      item?.functionName?.slice(0, 8) === "transfer"
                        ? "Transfer"
                        : `${item.functionName?.slice(0, 8)}...`}
                    </Box>
                  </Td>
                )}
                <Td>{item.from.slice(0, 7)}</Td>
                <Td>{item.to.slice(0, 7)}</Td>
                {selectedTxnsType.current?.value === "erc20" ? (
                  <Td>
                    {(
                      parseInt(item.value) /
                      10 ** parseInt(item.tokenDecimal)
                    )?.toFixed(2)}
                  </Td>
                ) : selectedTxnsType.current?.value === "normal" ? (
                  <Td>{(parseInt(item.value) / 10 ** 18)?.toFixed(5)}</Td>
                ) : (
                  <Td>{item.tokenSymbol}</Td>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

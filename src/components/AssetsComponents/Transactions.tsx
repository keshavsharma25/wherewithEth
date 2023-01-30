import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useAccount } from "wagmi";
import { ChainSelector } from "../ChainSelector";
const Transactions = ({
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

  const chainHandler = (e: string) => {
    setChain(e);
  };

  const txnsTypeHandler = (e: string) => {
    setTxnsType(e);
  };

  const { address, isConnected } = useAccount();

  const tokenOptions = [
    {
      value: "erc-20",
      label: "erc-20",
    },
    {
      value: "erc-721",
      label: "erc-721",
    },
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "erc-1155",
      label: "erc-1155",
    },
  ];

  const chainOptions = [
    {
      value: "eth-mainnet",
      label: "Ethereum",
    },
    {
      value: "matic-mainnet",
      label: "Polygon",
    },
    {
      value: "opt-mainnet",
      label: "Optimism",
    },
    {
      value: "arb-mainnet",
      label: "Arbitrum",
    },
  ];

  return (
    <Box
      mt={6}
      p={3}
      display={{ base: "none", sm: "block" }}
      borderRadius="12px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex justifyContent="center" alignItems="center" gap={2}>
          <Image
            src="/vuesax/bold/card-coin.png"
            height="5"
            width="25"
            alt="transactions"
          />
          <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
            Transactions
          </Text>
        </Flex>

        <Flex float="right" gap={5}>
          <ChainSelector
            ref={selectedTxnsType}
            setChain={(e) => txnsTypeHandler(e)}
            options={tokenOptions}
          />

          <ChainSelector
            options={chainOptions}
            ref={selectedChainref}
            setChain={(value) => chainHandler(value)}
          />
        </Flex>
      </Flex>
      <Table
        bg="#111320"
        border="1px solid red"
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
        <Tbody color="#B8B8BC">
          {data &&
            data?.map((item: any, index: number) => {
              return (
                <Tr key={index}>
                  <Td
                    onClick={() =>
                      router.push(
                        selectedChainref.current?.value === "matic-mainnet"
                          ? `https://polygonscan.com/tx/${item.hash}`
                          : `https://etherscan.io/tx/${item.hash}`
                      )
                    }
                    border="1px solid rgba(255, 255, 255, 0.03)"
                    borderRightColor="#111320"
                    _hover={{ cursor: "pointer", color: "white" }}
                  >
                    {item.hash.slice(0, 7)}
                  </Td>
                  {selectedTxnsType.current?.value === "normal" && (
                    <Td
                      borderRightColor="#111320"
                      border="1px solid rgba(255, 255, 255, 0.03)"
                    >
                      <Box
                        p={1}
                        rounded="md"
                        textAlign="center"
                        w="max"
                        px="4"
                        bg={
                          item?.functionName?.toLowerCase().slice(0, 8) ===
                            "transfer" || item?.functionName === ""
                            ? "rgba(53,218,178,0.08)"
                            : "rgba(79, 62, 224, 0.06)"
                        }
                        color={
                          item?.functionName?.toLowerCase().slice(0, 8) ===
                            "transfer" || item?.functionName === ""
                            ? "#35DAB2"
                            : "#9C90FF"
                        }
                      >
                        {item?.functionName === "" ||
                        item?.functionName?.slice(0, 8) === "transfer"
                          ? "Transfer"
                          : `${item.functionName?.slice(0, 8)}...`}
                      </Box>
                    </Td>
                  )}
                  <Td
                    borderRightColor="#111320"
                    border="1px solid rgba(255, 255, 255, 0.03)"
                  >
                    <Flex
                      justifyContent="flex-start"
                      w="max-content"
                      mr="-10rem"
                    >
                      {item.from.slice(0, 7)}
                      <Box
                        ml="6rem"
                        style={{
                          background: `${
                            item.from.toLowerCase() === address?.toLowerCase()
                              ? "rgba(255, 226, 124, 0.08)"
                              : "rgba(53, 218, 178, 0.08)"
                          }`,
                          color: `${
                            item.from.toLowerCase() === address?.toLowerCase()
                              ? "#E08849"
                              : "#35DAB2"
                          }`,
                        }}
                        rounded="md"
                        w="4rem"
                        textAlign="center"
                        px={2}
                      >
                        {item.from.toLowerCase() === address?.toLowerCase()
                          ? "OUT"
                          : "IN"}
                      </Box>
                    </Flex>
                  </Td>
                  <Td
                    borderRightColor="#111320"
                    border="1px solid rgba(255, 255, 255, 0.03)"
                  >
                    {item.to.slice(0, 7)}
                  </Td>
                  {selectedTxnsType.current?.value === "erc20" ? (
                    <Td
                      borderRightColor="#111320"
                      border="1px solid rgba(255, 255, 255, 0.03)"
                    >
                      <Flex gap={4}>
                        {parseFloat(
                          (
                            parseInt(item.value) /
                            10 ** parseInt(item.tokenDecimal)
                          )?.toFixed(5)
                        )}
                        {"  "}
                        <Text>{item.tokenSymbol}</Text>
                      </Flex>
                    </Td>
                  ) : selectedTxnsType.current?.value === "normal" ? (
                    <Td
                      borderRightColor="#111320"
                      border="1px solid rgba(255, 255, 255, 0.03)"
                    >
                      {parseFloat(
                        (parseInt(item.value) / 10 ** 18)?.toFixed(5)
                      )}{" "}
                      {selectedChainref?.current?.value === "eth-mainnet" &&
                        `Ξ`}
                    </Td>
                  ) : (
                    <Td
                      borderRightColor="#111320"
                      border="1px solid rgba(255, 255, 255, 0.03)"
                    >
                      {item.tokenSymbol}
                    </Td>
                  )}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};

export const TransactionMemo = React.memo(Transactions);

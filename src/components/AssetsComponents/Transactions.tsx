import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef, useEffect } from "react";

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

  const chainHandler = (e: any) => {
    setChain(e.target.value);
  };

  const txnsTypeHandler = (e: any) => {
    setTxnsType(e.target.value);
  };

  return (
    <Box mt={6} bg="#1B1D30" p={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
          Transactions
        </Text>
        <Flex float="right" gap={5}>
          <Select onChange={(e) => txnsTypeHandler(e)} color="white" w="max">
            <option defaultChecked value="erc20">
              erc-20
            </option>
            <option value="normal">Normal</option>

            <option value="erc721">erc-721</option>
            <option value="erc1155">erc-1155</option>
          </Select>
          <Select
            ref={selectedChainref}
            onChange={(e) => chainHandler(e)}
            color="white"
            w="max"
          >
            <option defaultChecked value="eth-mainnet">
              Ethereum
            </option>
            <option value="matic-mainnet">Polygon</option>
            <option value="opt-mainnet">Optimism</option>
            <option value="arb-mainnet">Arbitrum</option>
          </Select>
        </Flex>
      </Flex>
      <Table bg="#1B1D30" p={2} mt={5} borderRadius="12px">
        <Thead>
          <Tr>
            <Th fontSize="0.7rem" color="white">
              Txn. Hash
            </Th>
            <Th fontSize="0.7rem" color="white">
              From
            </Th>
            <Th fontSize="0.7rem" color="white">
              To
            </Th>
            <Th fontSize="0.7rem" color="white">
              Value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data?.map((item: any, index: number) => (
              <Tr key={index} color="gray.400">
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
                <Td>{item.from.slice(0, 7)}</Td>
                <Td>{item.to.slice(0, 7)}</Td>
                <Td>
                  {(
                    parseInt(item.value) /
                    10 ** parseInt(item.tokenDecimal)
                  )?.toFixed(2)}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

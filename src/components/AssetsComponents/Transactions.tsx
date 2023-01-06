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
import React from "react";

export const Transactions = ({
  data,
  setChain,
  chain,
}: {
  data: any;
  setChain: (e: any) => void;
  chain: string;
}) => {
  const router = useRouter();

  const chainHandler = (e: any) => {
    setChain(e.target.value);
  };

  return (
    <Box mt={6} bg="#1B1D30" p={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="white" fontSize="1.2rem" fontWeight="extrabold">
          Transactions
        </Text>
        <Box float="right">
          <Select onChange={(e) => chainHandler(e)} color="white" w="max">
            <option defaultChecked value="eth-mainnet">
              Ethereum
            </option>
            <option value="matic-mainnet">Polygon</option>
            <option value="opt-mainnet">Optimism</option>
            <option value="arb-mainnet">Arbitrum</option>
          </Select>
        </Box>
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
                      chain === "matic-mainnet"
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

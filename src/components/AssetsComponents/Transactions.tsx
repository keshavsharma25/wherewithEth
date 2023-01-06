import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export const Transactions = ({ data }: { data: any }) => {
  const router = useRouter();

  return (
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
                  router.push(`https://etherscan.io/tx/${item.hash}`)
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
  );
};

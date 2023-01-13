import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { BsBarChartFill } from "react-icons/bs";
import CoinInnerCard from "./CoinInnerCard";
import { userDetailContext } from "../Assets";

export const CoinsCard = () => {
  const userData = useContext(userDetailContext);
  useEffect(() => {
    console.log("User data is", userData);
  }, [userData]);
  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      direction="column"
      width="full"
      gap="5"
      bg="#1B1D30"
      p="2.25rem"
      borderRadius="12px"
    >
      <Flex justifyContent="center" alignItems="center" gap="2">
        <BsBarChartFill size="24" color="white" />{" "}
        <Heading fontSize="1.3rem" fontWeight="bold" color="white">
          Assets
        </Heading>
      </Flex>
      <Flex direction="column" width="full">
        <Flex justifyContent="space-between" alignItems="center" width="full">
          <Text color="#647087">CURRENCY</Text>
          <Text color="#647087">QTY</Text>
        </Flex>
        <Flex mt={10} direction="column" gap={5}>
          {userData?.assets?.map((user: any, index: number) => (
            <CoinInnerCard
              address={user?.code}
              key={index}
              name={user?.code}
              image={user?.image?.png64}
              incrasePercentage={0}
              quantity={Number(
                (Number(user?.balance) / Math.pow(10, user?.decimals))?.toFixed(
                  5
                )
              )}
              token_value={user.quote_rate ? user.quote_rate : 0}
              value={Number(user?.quote?.toFixed(2))}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

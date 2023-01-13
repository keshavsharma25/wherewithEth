import { Flex, Heading, Select, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BsBarChartFill } from "react-icons/bs";

import { userDetailContext } from "../Assets";
import CoinInnerCard from "./CoinInnerCard";

interface CoinsCardProps {
  setChain: (value: string) => void;
  chain: string;
  loading: boolean;
}

export const CoinsCard = ({ setChain, chain, loading }: CoinsCardProps) => {
  const userData = useContext(userDetailContext);

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
      <Flex justifyContent="space-between" w="full" alignItems="center">
        <Flex justifyContent="center" alignItems="center" gap="2">
          <BsBarChartFill size="24" color="white" />{" "}
          <Heading fontSize="1.3rem" fontWeight="bold" color="white">
            Assets
          </Heading>
        </Flex>
        <Select
          onChange={(e) => setChain(e.target.value)}
          color={"white"}
          w="max"
        >
          <option
            style={{ backgroundColor: "#1B1D30" }}
            defaultChecked
            value="all"
          >
            All
          </option>
          <option style={{ backgroundColor: "#1B1D30" }} value="eth-mainnet">
            Ethereum
          </option>
          <option style={{ backgroundColor: "#1B1D30" }} value="matic-mainnet">
            Polygon
          </option>
        </Select>
      </Flex>
      <Flex direction="column" width="full">
        <Flex justifyContent="space-between" alignItems="center" width="full">
          <Text color="#647087">CURRENCY</Text>
          <Text color="#647087">QTY</Text>
        </Flex>
        {loading ? (
          <Spinner mx="auto" size="xl" color="blue.500" />
        ) : (
          <Flex mt={10} direction="column" gap={5}>
            {chain === "all"
              ? userData?.assets?.map((user: any, index: number) => (
                  <CoinInnerCard
                    address={user?.code}
                    key={index}
                    name={user?.code}
                    image={user?.image?.png64}
                    increasePercentage={parseFloat(
                      ((user?.delta?.day - 1) * 100)?.toFixed(2)
                    )}
                    quantity={Number(
                      (
                        Number(user?.balance) / Math.pow(10, user?.decimals)
                      )?.toFixed(5)
                    )}
                    token_value={user.rate ? user.rate : 0}
                    value={Number(user?.quote?.toFixed(2))}
                  />
                ))
              : userData?.assets
                  ?.filter((user: any) => user?.chain === chain)
                  .map((user: any, index: number) => (
                    <CoinInnerCard
                      address={user?.code}
                      key={index}
                      name={user?.code}
                      image={user?.image?.png64}
                      increasePercentage={parseFloat(
                        ((user?.delta?.day - 1) * 100)?.toFixed(2)
                      )}
                      quantity={Number(
                        (
                          Number(user?.balance) / Math.pow(10, user?.decimals)
                        )?.toFixed(5)
                      )}
                      token_value={user.rate ? user.rate : 0}
                      value={Number(user?.quote?.toFixed(2))}
                    />
                  ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

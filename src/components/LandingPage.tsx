import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import "@fontsource/dm-sans";
import "@fontsource/plus-jakarta-sans";
import { ArticleCard } from "./ArticleCard";
import { ConnectButtonCustom } from "./ConnectButtonCustom";

export interface ILandingPageProps {}

export function LandingPage(props: ILandingPageProps) {
  return (
    <>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Heading
          fontSize="4rem"
          color="white"
          textAlign={"center"}
          pt="6.75rem"
          pb="2.81rem"
          letterSpacing="0.2rem"
        >
          One click will reveal your <br /> Net Worth
        </Heading>
        <Text
          color="#9A9AB7"
          fontSize="1.25rem"
          fontFamily="DM Sans"
          fontWeight="400"
        >
          Never before has it been so easy to keep track of your wallet&apos;s
          assets.
        </Text>
        <Box pt="5.5rem">
          <AspectRatio w="64rem" h="36.5rem" ratio={4 / 3}>
            <Image src="./mockup.png" alt="mockup" objectFit="inherit" />
          </AspectRatio>
        </Box>
        <Flex
          flexDirection={{
            base: "row",
            lg: "row",
            md: "column",
          }}
          w="74.68rem"
          pt="15.18rem"
          justifyContent="space-between"
        >
          <Box maxW="46.625rem" w="46.625rem" pt="2.25rem" pr="4.19rem">
            <VStack alignItems="flex-start">
              <Flex flexDirection="row" alignItems="center" position="relative">
                <Image
                  src="eth.svg"
                  alt="ethlogo"
                  h="112"
                  w="112"
                  position="absolute"
                  top="-2rem"
                  left="-3rem"
                  opacity="0.04"
                  zIndex="2"
                />
                <Heading
                  color="white"
                  fontSize="2rem"
                  fontFamily=""
                  lineHeight="3rem"
                  fontWeight="800"
                >
                  What is wherewithETH?
                </Heading>
              </Flex>
              <Text
                color="#9A9AB7"
                maxW="42.68rem"
                fontFamily="DM Sans"
                fontWeight="400"
                lineHeight="1.75rem"
                pt="2.31rem"
                pb="3rem"
              >
                WherewithEth is a platform that allows users to track and manage
                their EVM-related assets in real time. It is inspired by the
                word &quot;wherewithal&quot; which refers to the resources or
                means necessary to do something. With wherewithEth, users can
                easily view the status of their EVM-based wallet&apos;s asset
                portfolio and make informed decisions about their financial
                situation and their assets.
              </Text>
              <ConnectButtonCustom title="Connect Wallet" />
            </VStack>
          </Box>
          <AspectRatio minW="25rem" minH="22.5rem">
            <Image
              src="netWorthTxnNFT.png"
              alt="netWorthTxnNFT"
              objectFit="contain"
            />
          </AspectRatio>
        </Flex>
      </Flex>
      {/* <Box pt="13.25rem" ml="7.5rem">
        <Heading
          fontSize="2rem"
          lineHeight="3rem"
          fontWeight="800"
          color="white"
          pb="3rem"
        >
          Related articles
        </Heading>
        <Flex flexDirection="row">
          <ArticleCard
            title="What is Web3 and why is it important?"
            thumbnail="https://i.pinimg.com/736x/af/44/ea/af44ea07fa5bfd828004747f62f63bc3.jpg"
          />
          <ArticleCard
            title="What is Web3 and why is it important?"
            thumbnail="https://i.pinimg.com/736x/af/44/ea/af44ea07fa5bfd828004747f62f63bc3.jpg"
          />
        </Flex>
      </Box> */}
    </>
  );
}

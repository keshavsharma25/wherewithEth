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
  const landingPageImages = [
    {
      src: "newWorthIcon.png",
    },
    {
      src: "NFTIcon.png",
    },
    {
      src: "TransactionIcon.png",
    },
  ];
  return (
    <>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Heading
          fontSize={["1.5rem", "2.5rem", "3rem", "3.5rem", "4rem"]}
          color="white"
          textAlign={"center"}
          pt="6.75rem"
          px={["1.5rem", "2rem", "2.5rem", "3rem", "3.5rem"]}
          pb="2.81rem"
          letterSpacing="0.2rem"
        >
          One click will reveal your <br /> Net Worth
        </Heading>
        <Text
          color="#9A9AB7"
          fontSize={["0.9rem", "1rem", "1.10rem", "1.25rem", "1.5rem"]}
          px={["1.5rem", "2rem", "2.5rem", "3rem", "3.5rem"]}
          fontFamily="DM Sans"
          fontWeight="400"
          textAlign={"center"}
        >
          Never before has it been so easy to keep track of your wallet&apos;s
          assets.
        </Text>
        <Box pt="5.5rem">
          <AspectRatio
            w={["19.2rem", "25.6rem", "38.4rem", "51.2rem", "64rem"]}
            h={["10.95rem", "14.6rem", "21.9rem", "29.2rem", "36.5rem"]}
            ratio={4 / 3}
          >
            <Image src="./mockup.png" alt="mockup" objectFit="inherit" />
          </AspectRatio>
        </Box>

        <Flex
          flexDirection={{
            base: "column",
            lg: "row",
            md: "column",
          }}
          maxW="74.68rem"
          pt={{ base: "3rem", md: "15.18rem" }}
          justifyContent="space-between"
        >
          <Box pt="2.25rem" mr="1.5rem">
            <VStack alignItems={{ base: "center", lg: "flex-start" }}>
              <Flex alignItems="center" position="relative">
                <Image
                  src="eth.svg"
                  alt="ethlogo"
                  h="112"
                  w="112"
                  display={{ base: "none", md: "block" }}
                  position="absolute"
                  top="-2rem"
                  left="-3rem"
                  opacity="0.04"
                  zIndex="2"
                />
                <Heading
                  color="white"
                  fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.8rem" }}
                  fontFamily=""
                  lineHeight="3rem"
                  fontWeight="600"
                >
                  What is wherewithETH?
                </Heading>
              </Flex>
              <Text
                color="#9A9AB7"
                maxW={{ lg: "30rem", xl: "42.68rem" }}
                fontFamily="DM Sans"
                fontWeight="400"
                lineHeight={{ base: "1.75rem", lg: "1.5rem", xl: "1.75rem" }}
                textAlign={{ base: "center", lg: "left" }}
                pt={{ base: "1rem", lg: "1.5rem", xl: "2.31rem" }}
                pb={{ base: "3rem", lg: "2rem", xl: "3rem" }}
                px={{ base: "10", lg: "0" }}
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
          <Box
            w={{ md: "15rem", lg: "20rem", xl: "30rem" }}
            display={{ base: "none", lg: "block" }}
            marginX={{ md: "auto", lg: 0 }}
          >
            <Image
              w="full"
              h="full"
              src="netWorthTxnNFT.png"
              alt="netWorthTxnNFT"
              objectFit="contain"
            />
          </Box>
          <Flex
            display={{ base: "flex", lg: "none" }}
            mt="10"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap="5"
          >
            {landingPageImages.map((image, index) => (
              <Image
                key={index}
                marginX="auto"
                w={{ base: "24", lg: "80" }}
                h="full"
                src={image.src}
                alt={image.src}
              />
            ))}
          </Flex>
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

//   );
// }

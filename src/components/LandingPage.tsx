import { AspectRatio, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import "@fontsource/dm-sans";

export interface ILandingPageProps {}

export function LandingPage(props: ILandingPageProps) {
  return (
    <Flex flexDirection="column" alignItems="center">
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
          <Image src="./mockup.png" alt="mockup" objectFit="contain" />
        </AspectRatio>
      </Box>
    </Flex>
  );
}

import { Flex, Heading, Img } from "@chakra-ui/react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButtonCustom } from "./ConnectButtonCustom";

export interface INavbarProps {}

export function Navbar(props: INavbarProps) {
  const { address, isConnected } = useAccount();

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bgColor="#0C0C0D"
        height="5rem"
        px={{ base: "1rem", md: "2rem" }}
      >
        <Flex flexDirection={"row"} alignItems={"center"}>
          <Link href="/">
            <Img src="/eth.svg" alt="ethereum" />
          </Link>
          <Heading size="md" fontFamily="Arial" color={"whiteAlpha.900"}>
            <Link href="/">wherewithETH</Link>
          </Heading>
        </Flex>
        <Flex alignItems="center">
          <ConnectButtonCustom title="Connect" />
        </Flex>
      </Flex>
    </>
  );
}

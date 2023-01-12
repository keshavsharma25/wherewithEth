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
        paddingX="1rem"
      >
        <Flex
          justifyContent={"center"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Link href="/">
            <Img src="/eth.svg" alt="ethereum" />
          </Link>
          <Heading
            size={{ base: "sm", sm: "md" }}
            fontFamily="Arial"
            color={"whiteAlpha.900"}
          >
            <Link href="/">wherewithETH</Link>
          </Heading>
        </Flex>
        <Flex>
          <ConnectButtonCustom title="Connect" />
        </Flex>
      </Flex>
    </>
  );
}

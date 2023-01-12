import { Box, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoPersonOutline } from "react-icons/io5";
import "@fontsource/plus-jakarta-sans";

export interface IConnectButtonCustomProps {
  title: string;
}

export function ConnectButtonCustom(props: IConnectButtonCustomProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <Box
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button
                      onClick={openConnectModal}
                      color={"white"}
                      bgGradient="linear(180deg, #9C90FF -20%, #4F3EE0 133%);)"
                      _hover={{
                        bgGradient:
                          "linear(180deg, #7C73CC -20%, #3F31B3 133%);)",
                      }}
                      _active={{
                        bgGradient:
                          "linear(180deg, #7C73CC -20%, #3F31B3 133%);)",
                      }}
                      px="0.875rem"
                      py={{ base: "1rem", md: "1.5rem" }}
                      w={{ sm: "5rem", md: "9.19rem" }}
                      h={{ base: ".5rem", md: "3.13rem" }}
                      fontSize={{ base: "0.8rem", md: "1.25rem" }}
                      lineHeight="1.375rem"
                      fontFamily="Plus Jakarta Sans"
                      fontWeight="800"
                    >
                      {props.title}
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <Button
                    onClick={openAccountModal}
                    type="button"
                    backgroundColor="pButton"
                    color="white"
                    _hover={{
                      backgroundColor: "pButtonHover",
                    }}
                    _active={{
                      backgroundColor: "pButton",
                    }}
                    px="0.5rem"
                    py="0.25rem"
                    justifyContent="space-between"
                  >
                    <Box pr={"3"}>
                      <IoPersonOutline size="1.25rem" />
                    </Box>
                    {account.displayName}
                  </Button>
                );
              })()}
            </Box>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

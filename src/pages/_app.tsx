import { ChakraProvider, GlobalStyle } from "@chakra-ui/react";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { newTheme } from "../styles/themes";

import { chains, client } from "../wagmi";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <>
      <WagmiConfig client={client}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#4f3ee0",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <NextHead>
            <title>wherewithETH</title>
          </NextHead>
          <ChakraProvider theme={newTheme}>
            {mounted && <Component {...pageProps} />}
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;

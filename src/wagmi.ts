import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, defaultChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "wherewithETH",
  chains,
});

export const client = createClient({
  connectors,
  provider,
  webSocketProvider,
});

export { chains };

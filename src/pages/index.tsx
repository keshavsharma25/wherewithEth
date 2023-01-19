import { useAccount } from "wagmi";
import { LandingPage, Navbar, Layout, Assets } from "../components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function Page() {
  const { address, isConnected } = useAccount();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>{isConnected ? <Assets /> : <LandingPage />}</Layout>
    </QueryClientProvider>
  );
}

export default Page;

import { useAccount } from "wagmi";
import { LandingPage, Navbar, Layout, Assets } from "../components";

function Page() {
  const { address, isConnected } = useAccount();

  return <Layout>{isConnected ? <Assets /> : <LandingPage />}</Layout>;
}

export default Page;

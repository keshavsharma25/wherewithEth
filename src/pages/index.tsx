import { Box } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { useAccount } from "wagmi";
import { LandingPage } from "../components/LandingPage";

function Page() {
  const { address, isConnected } = useAccount();

  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default Page;

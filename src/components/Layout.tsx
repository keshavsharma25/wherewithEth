import { Navbar } from "./Navbar";
import React from "react";
import { Footer } from "./Footer";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

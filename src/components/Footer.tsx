import { Box, Heading } from "@chakra-ui/react";
import * as React from "react";

export interface IFooterProps {}

export function Footer({}: IFooterProps) {
  return (
    <Box
      height={10}
      width="full"
      background="black"
      position="fixed"
      bottom="0"
      mt="5rem"
    >
      <Heading color="white">Footer</Heading>
    </Box>
  );
}

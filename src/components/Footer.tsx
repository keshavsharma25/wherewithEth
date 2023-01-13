import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

export interface IFooterProps {}

export function Footer({}: IFooterProps) {
  return (
    <Flex
      height={10}
      width="full"
      background="black"
      mt="5rem"
      direction="column"
      justifyContent="center"
      alignItems="center"
      py="10"
      gap="2"
    >
      <Flex gap="2">
        <AiFillGithub
          fill="#979DAD"
          onClick={() => {}}
          size="1.6rem"
          cursor="pointer"
        />
        {/* <AiFillTwitterCircle fill="#979DAD" onClick={() => {}} /> */}
      </Flex>
      <Text color="#5B647A" fontSize={{ base: "0.7rem", md: "1rem" }}>
        Copyright &copy; 2022 wherewithETH. All Rights Reserved
      </Text>
    </Flex>
  );
}

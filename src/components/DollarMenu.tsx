import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
  color,
} from "@chakra-ui/react";
import * as React from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";

export interface IDollarMenuProps {}

export function DollarMenu(props: IDollarMenuProps) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<IoChevronDownCircleOutline />}
        backgroundColor="pButton"
        color="white"
        _hover={{ backgroundColor: "pButtonHover" }}
        _active={{ backgroundColor: "pButton" }}
      >
        <BsCurrencyDollar />
      </MenuButton>
      <MenuList w="10px">
        <MenuItem w="10px">
          <BiRupee />
        </MenuItem>
        <MenuItem w="10px"></MenuItem>
        <MenuItem w="10px"></MenuItem>
        <MenuItem w="10px"></MenuItem>
      </MenuList>
    </Menu>
  );
}

import { extendTheme } from "@chakra-ui/react";
import "@fontsource/plus-jakarta-sans";

export const newTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#131527",
      },
    },
  },
  colors: {
    primary: "#131527",
    pButton: "#23263F",
    pButtonHover: "#2F3247",
  },
  fonts: {
    heading: "Plus Jakarta Sans",
    body: "Plus Jakarta Sans",
  },
});

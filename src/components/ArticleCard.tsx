import {
  AspectRatio,
  Box,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

export interface IArticleCardProps {
  thumbnail: string;
  title: string;
  href?: string;
}

export function ArticleCard(props: IArticleCardProps) {
  return (
    <LinkBox
      pr="3rem"
      _hover={{
        transform: "scale(1.02)",
        transition: "all 0.2s",
        cursor: "pointer",
      }}
    >
      <LinkOverlay href={props.href}>
        <Box w="17.125rem">
          <Box borderTopRadius="1rem">
            <AspectRatio ratio={4 / 3} w="17.125rem" h="10rem">
              <Image
                borderTopRadius="1rem"
                src={props.thumbnail}
                alt="thumbnail"
              />
            </AspectRatio>
          </Box>
          <Box bgColor="#1D1F37" borderBottomRadius="1rem">
            <Text
              color="white"
              pt="1.25rem"
              pb="2.5rem"
              pl="1.125rem"
              pr="2.375rem"
            >
              {props.title}
            </Text>
          </Box>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
}

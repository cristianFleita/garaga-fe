import { Flex, Spinner } from "@chakra-ui/react";
import { BROWN_DARKEST, YELLOW } from "../theme/colors";

interface PopupBannerProps {
  text: string;
}

export const PopupBanner: React.FC<PopupBannerProps> = ({ text }) => {
  return (
    <Flex
      backgroundColor={`${BROWN_DARKEST}`}
      color={`${YELLOW}`}
      fontWeight={900}
      fontSize={"40px"}
      width={"100%"}
      p={4}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {text}
      <Spinner />
    </Flex>
  );
};

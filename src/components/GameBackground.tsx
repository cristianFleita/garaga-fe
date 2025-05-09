import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface GameBackgroundProps {
  children: ReactNode;
}

export const GameBackground = ({ children }: GameBackgroundProps) => {
  return (
    <Flex
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      background={`url(images/bg/bg_02.png) center center / cover no-repeat`}
      gap={4}
      py={2}
      px={8}
    >
      {children}
    </Flex>
  );
};

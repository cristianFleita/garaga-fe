import { Flex } from "@chakra-ui/react";
import { BROWN, BROWN_DARK } from "../theme/colors";

export const MenuContainer: React.FC<{
  children: React.ReactNode;
  full?: boolean;
}> = ({ children, full }) => {
  return (
    <Flex
      flexDirection="column"
      backgroundColor={`${BROWN}`}
      boxShadow={`0px 0px 4px 2px ${BROWN_DARK}`}
      alignItems={"center"}
      justifyContent="center"
      p={4}
      gap={4}
      borderRadius={8}
      height={full ? "100%" : "auto"}
      width="100%"
      overflow="hidden"
    >
      {children}
    </Flex>
  );
};

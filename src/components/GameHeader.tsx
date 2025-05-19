import { Flex, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import { BROWN_DARKEST } from "../theme/colors";
import { UserComponent } from "./UsernameComponent";

interface GameHeaderProps {
  username: string;
  gameId: number;
  round: number;
}

export const GameHeader = ({ username, gameId, round }: GameHeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  return (
    <Flex 
      alignItems="center" 
      p={2}
      flexDirection={isMobile ? "column" : "row"}
      gap={isMobile ? 2 : 0}
    >
      <UserComponent username={username} />
      
      <Flex 
        ml={isMobile ? 0 : "auto"} 
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "center" : "flex-end"}
        gap={isMobile ? 1 : 4}
      >
        <Text 
          color={BROWN_DARKEST} 
          fontSize={isMobile ? "24px" : "40px"} 
          fontWeight={900}
        >
          GAME ID {gameId}
        </Text>
        <Text 
          color={BROWN_DARKEST} 
          fontSize={isMobile ? "24px" : "40px"} 
          fontWeight={900}
        >
          ROUND {round}
        </Text>
      </Flex>
    </Flex>
  );
};

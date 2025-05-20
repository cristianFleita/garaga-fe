import { Flex, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import { BROWN_DARKEST, BROWN, YELLOW } from "../theme/colors";
import { UserComponent } from "./UsernameComponent";

interface GameHeaderProps {
  username: string;
  gameId: number;
  round: number;
  player1Score?: number;
  player2Score?: number;
  player1Name?: string;
  player2Name?: string;
  isCurrentPlayer1?: boolean;
}

export const GameHeader = ({ 
  username, 
  gameId, 
  round,
  player1Score = 0,
  player2Score = 0,
  player1Name = "Player 1",
  player2Name = "Player 2",
  isCurrentPlayer1 = true
}: GameHeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Determina qué puntuación mostrar primero basado en si el jugador actual es player1
  const myScore = isCurrentPlayer1 ? player1Score : player2Score;
  const opponentScore = isCurrentPlayer1 ? player2Score : player1Score;
  
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
          ROUND {round}
        </Text>
        <Text 
          color={BROWN_DARKEST} 
          fontSize={isMobile ? "24px" : "40px"} 
          fontWeight={900}
        >
          SCORE: {myScore} - {opponentScore}
        </Text>
        
        {/* <Text 
          color={BROWN_DARKEST} 
          fontSize={isMobile ? "24px" : "40px"} 
          fontWeight={900}
        >
          GAME ID {gameId}
        </Text> */}
      </Flex>
    </Flex>
  );
};

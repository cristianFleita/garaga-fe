import { Button, Flex, Input, Image, useToast } from "@chakra-ui/react";
import { useGameContext } from "../providers/GameProvider";
import { useCells } from "../dojo/queries/useCells";
import { useState } from "react";
import { MenuContainer } from "../components/MenuContainer";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";

export const Lobby = () => {
  const {
    executeCreateGame,
    joinGame,
    submitWolfCommitment,
    wolfKillSheep,
    shepherdMarkSuspicious,
    checkIsWolf,
  } = useGameContext();
  const [gameId, setGameId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const toast = useToast();

  const handleJoinGame = () => {
    // Validar que el ID del juego sea un número válido
    const parsedGameId = Number(gameId);
    
    if (!gameId || isNaN(parsedGameId) || parsedGameId <= 0) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un ID de juego válido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsJoining(true);
    
    try {
      joinGame(parsedGameId);
    } catch (error) {
      console.error("Error al unirse al juego:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al unirse al juego",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Flex 
      flexDir={"column"} 
      alignItems={"center"} 
      minH={"100vh"}
    >
      <Image 
        src="images/bg/home-bg.png" 
        width={["90%", "80%", "70%"]}
        minW={"400px"}
        maxW={"1200px"}
        mt={"20vh"}
        objectFit={"contain"}
      />
      
      <Flex 
        flexDir={"column"} 
        gap={4} 
        mt={8}
      >
        <Button
          variant={"secondarySolid"}
          background={`url(images/bg/btn-bg-1.png)`}
          backgroundSize={"fit"}
          backgroundPosition={"center"}
          onClick={() => {
            executeCreateGame();
          }}
        >
          Create Game
        </Button>
        <Flex gap={4}>
          <Input
            type="number"
            variant={"solid"}
            placeholder="Enter game ID"
            value={gameId}
            onChange={(e) => {
              setGameId(e.target.value);
            }}
            maxW="260px"
          />
          <Button
            variant={"secondarySolid"}
            background={`url(images/bg/btn-bg-1.png)`}
            backgroundSize={"fit"}
            backgroundPosition={"center"}
            onClick={handleJoinGame}
            isLoading={isJoining}
            loadingText="Uniendo..."
          >
            Join
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

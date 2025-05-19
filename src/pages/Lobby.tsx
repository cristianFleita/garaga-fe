import { Button, Flex, Input, Image } from "@chakra-ui/react";
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
            onClick={() => {
              joinGame(Number(gameId));
            }}
          >
            Join
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

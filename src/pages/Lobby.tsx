import { Button, Flex } from "@chakra-ui/react";
import { useGameContext } from "../providers/GameProvider";

export const Lobby = () => {
  const { executeCreateGame, joinGame } = useGameContext();

  return (
    <Flex>
      <Button
        onClick={() => {
          executeCreateGame();
        }}
      >
        Create Game
      </Button>
      <Button
        onClick={() => {
          joinGame(1);
        }}
      >
        Join
      </Button>
    </Flex>
  );
};

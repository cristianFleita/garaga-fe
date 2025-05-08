import { Button, Flex } from "@chakra-ui/react";
import { useGameContext } from "../providers/GameProvider";
import { useCells } from "../dojo/queries/useCells";

export const Lobby = () => {
  const { executeCreateGame, joinGame } = useGameContext();

  let cells = useCells();

  console.log(cells);

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

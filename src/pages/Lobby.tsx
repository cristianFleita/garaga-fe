import { Button, Flex, Input } from "@chakra-ui/react";
import { useGameContext } from "../providers/GameProvider";
import { useCells } from "../dojo/queries/useCells";
import { useState } from "react";
import { MenuContainer } from "../components/MenuContainer";

export const Lobby = () => {
  const { executeCreateGame, joinGame } = useGameContext();
  const [gameId, setGameId] = useState("");

  let cells = useCells();

  console.log(cells);

  return (
    <MenuContainer>
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
          onClick={() => {
            joinGame(Number(gameId));
          }}
        >
          Join
        </Button>
      </Flex>
      <Button
        variant={"secondarySolid"}
        onClick={() => {
          executeCreateGame();
        }}
      >
        Create Game
      </Button>
    </MenuContainer>
  );
};

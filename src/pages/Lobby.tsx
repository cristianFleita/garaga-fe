import { Button, Flex, Input } from "@chakra-ui/react";
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

  //   let cells = useCells();
  //   console.log(cells);
  console.log(useGame());
  console.log(useRound());

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

      {/* <Button
        variant={"secondarySolid"}
        onClick={() => {
          submitWolfCommitment(1);
        }}
      >
        Submit Commitment
      </Button>

      <Button
        variant={"secondarySolid"}
        onClick={() => {
          wolfKillSheep(2);
        }}
      >
        Kill sheep
      </Button>

      <Button
        variant={"secondarySolid"}
        onClick={() => {
          shepherdMarkSuspicious(4);
        }}
      >
        Select sheep
      </Button>

      <Button
        variant={"secondarySolid"}
        onClick={() => {
          checkIsWolf();
        }}
      >
        check is wolf
      </Button> */}
    </MenuContainer>
  );
};

import { Flex } from "@chakra-ui/react";
import { MenuContainer } from "../components/MenuContainer";
import { GameSidebarMenu } from "../components/GameSidebarMenu";
import { GameGrid } from "../components/GameGrid";
import { GameHeader } from "../components/GameHeader";
import { useEffect, useState } from "react";
import { WaitForPlayerPopup } from "../components/popups/WaitForPlayerPopup";
import { GameBackground } from "../components/GameBackground";
import { GameoverPopup } from "../components/popups/GameoverPopup";
import { useDojo } from "../dojo/DojoContext";
import { useUsername } from "../dojo/utils/useUsername";
import { useGameContext } from "../providers/GameProvider";
import { useRound } from "../dojo/queries/useRound";
import { useGame } from "../dojo/queries/useGame";
import { GridCell } from "../types/GameGrid";

enum CharacterIdEnum {
  SHEPHERD = 1,
  WOLF = 2,
}

export const Game = () => {
  const {
    setup: { masterAccount },
    account: { account },
  } = useDojo();

  const username = useUsername();
  const round = useRound();
  const game = useGame();
  const {
    checkOrCreateGame,
    showWaitForPlayer,
    gridCells,
    isWolf,
    isPlayerTurn,
    canHide,
    canChoose,
    gameOver,
    player,
    oponent,
    winner,
  } = useGameContext();

  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);

  useEffect(() => {
    if (account !== masterAccount && username) {
      checkOrCreateGame();
    }
  }, [account, username]);

  return (
    <GameBackground>
      <>
        {showWaitForPlayer && <WaitForPlayerPopup />}
        {gameOver && (
          <GameoverPopup player={player} oponent={oponent} winner={winner} />
        )}
        <GameHeader
          username={username ?? ""}
          gameId={Number(round?.game_id)}
          round={Number(game?.round_count)}
        />
        <Flex
          flexDirection={"column"}
          gap={4}
          p={2}
          height="100%"
          justifyContent={"center"}
          overflow="hidden"
        >
          <Flex
            gap={20}
            p={2}
            flexGrow={1}
            height={"100%"}
            justifyContent={"space-evenly"}
            overflow="hidden"
          >
            <GameSidebarMenu
              characterId={
                isWolf ? CharacterIdEnum.WOLF : CharacterIdEnum.SHEPHERD
              }
              showHideButton={canHide}
              showChooseButton={canChoose}
              selectedCell={selectedCell}
            />
            <Flex 
              flexDirection={"column"} 
              height={"100%"} 
              width={"40%"}
              overflow="hidden"
            >
              <MenuContainer full>
                <GameGrid
                  cells={gridCells}
                  canSelect={isPlayerTurn}
                  setSelectedCell={setSelectedCell}
                />
              </MenuContainer>
            </Flex>
          </Flex>
        </Flex>
      </>
    </GameBackground>
  );
};

import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
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
import { RoundStateEnum, GameStateEnum } from "../dojo/typescript/custom";
import { num } from "starknet";

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
    gameId,
  } = useGameContext();

  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const selectionColor =
    round?.state.toString() === RoundStateEnum.WaitingForWolfSelection ||
    round?.state.toString() === RoundStateEnum.WaitingForSheepToKill
      ? "red"
      : "blue";

  // Determine if current player is the creator (player_1)
  const isCreator = game?.player_1
    ? num.toHexString(game?.player_1.toString() ?? 0) === account.address
    : false;

  // Show game ID only when waiting for player 2 (game is in Waiting state)
  const showGameId = game?.state === GameStateEnum.Waiting;

  useEffect(() => {
    if (account !== masterAccount && username) {
      checkOrCreateGame();
    }
  }, [account, username]);

  return (
    <GameBackground>
      <>
        {showWaitForPlayer && (
          <WaitForPlayerPopup
            gameId={gameId}
            isCreator={isCreator}
            showGameId={showGameId}
          />
        )}
        {gameOver && (
          <GameoverPopup player={player} oponent={oponent} winner={winner} />
        )}
        <GameHeader
          username={player.controllerName ?? ""}
          gameId={Number(round?.game_id)}
          round={Number(game?.round_count)}
          player1Score={game?.player_1_score ?? 0}
          player2Score={game?.player_2_score ?? 0}
          player1Name={
            game?.player_1 ? `Player 1${isCreator ? " (You)" : ""}` : "Player 1"
          }
          player2Name={
            game?.player_2
              ? `Player 2${!isCreator ? " (You)" : ""}`
              : "Player 2"
          }
          isCurrentPlayer1={isCreator}
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
            flexDirection={isMobile ? "column" : "row"}
            gap={isMobile ? 4 : 20}
            p={2}
            flexGrow={1}
            height={"100%"}
            justifyContent={"space-evenly"}
            alignItems="center"
            overflow="hidden"
          >
            {/* Game Grid for mobile - shown at top on small screens */}
            {isMobile && (
              <Flex
                flexDirection={"column"}
                width={"100%"}
                maxWidth="500px"
                overflow="hidden"
              >
                <MenuContainer full>
                  <GameGrid
                    cells={gridCells}
                    canSelect={isPlayerTurn}
                    setSelectedCell={setSelectedCell}
                    selectionColor={selectionColor}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                </MenuContainer>
              </Flex>
            )}

            {/* Character and buttons */}
            <Box
              width={isMobile ? "100%" : "auto"}
              maxWidth={isMobile ? "300px" : "auto"}
            >
              <GameSidebarMenu
                characterId={
                  isWolf ? CharacterIdEnum.WOLF : CharacterIdEnum.SHEPHERD
                }
                showHideButton={canHide}
                showChooseButton={canChoose}
                selectedCell={selectedCell}
                setSelectedIndex={setSelectedIndex}
              />
            </Box>

            {/* Game Grid for desktop - shown beside character on larger screens */}
            {!isMobile && (
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
                    selectionColor={selectionColor}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                </MenuContainer>
              </Flex>
            )}
          </Flex>
        </Flex>
      </>
    </GameBackground>
  );
};

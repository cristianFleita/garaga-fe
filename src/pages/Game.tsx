import { Flex } from "@chakra-ui/react";
import { MenuContainer } from "../components/MenuContainer";
import { GameSidebarMenu } from "../components/GameSidebarMenu";
import { GameGrid } from "../components/GameGrid";
import { GameHeader } from "../components/GameHeader";
import { gameMockWolf as gameMock } from "../mocks/gameMock";
import { playerLose as gameOverMock } from "../mocks/gameOverMock";
import { useEffect, useState } from "react";
import { WaitForPlayerPopup } from "../components/popups/WaitForPlayerPopup";
import { GameBackground } from "../components/GameBackground";
import { GameoverPopup } from "../components/popups/GameoverPopup";
import { useDojo } from "../dojo/DojoContext";
import { useUsername } from "../dojo/utils/useUsername";
import { useGameContext } from "../providers/GameProvider";

export const Game = () => {
  const {
    setup: { masterAccount },
    account: { account },
  } = useDojo();

  const username = useUsername();
  const { checkOrCreateGame, showWaitForPlayer } = useGameContext();

  const [gameOver, setGameOver] = useState(false);

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
          <GameoverPopup
            player={gameOverMock.player}
            oponent={gameOverMock.oponent}
            winner={gameOverMock.winner}
          />
        )}
        <GameHeader username={gameMock.username} round={gameMock.round} />
        <Flex
          flexDirection={"column"}
          gap={4}
          p={2}
          height="100%"
          justifyContent={"center"}
        >
          <Flex
            gap={20}
            p={2}
            flexGrow={1}
            height={"100%"}
            justifyContent={"space-evenly"}
          >
            <GameSidebarMenu
              characterId={gameMock.characterId}
              showHideButton={gameMock.showHideBtn}
              showChooseButton={gameMock.showChooseBtn}
            />
            <Flex flexDirection={"column"} height={"100%"}>
              <MenuContainer full>
                <GameGrid
                  cells={gameMock.grid}
                  canSelect={gameMock.canSelectGrid}
                />
              </MenuContainer>
            </Flex>
          </Flex>
        </Flex>
      </>
    </GameBackground>
  );
};

import { Flex } from "@chakra-ui/react";
import { MenuContainer } from "../components/MenuContainer";
import { GameSidebarMenu } from "../components/GameSidebarMenu";
import { GameGrid } from "../components/GameGrid";
import { GameHeader } from "../components/GameHeader";
import { gameMockWolf as gameMock } from "../mocks/gameMock";

export const Game = () => {
  return (
    <Flex
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      background={`url(images/bg_02.png) center center / cover no-repeat`}
      gap={4}
      py={2}
      px={8}
    >
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
    </Flex>
  );
};

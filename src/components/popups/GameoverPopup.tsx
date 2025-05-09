import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { InformationPopUp } from "../InformationPopUp";
import { MenuContainer } from "../MenuContainer";
import { BROWN, YELLOW } from "../../theme/colors";
import { PlayerResults } from "./PlayerResults";
import { Player } from "../../state/useGameState";

interface GameoverPopupProps {
  player: Player;
  oponent: Player;
  winner: boolean;
}

export const GameoverPopup: React.FC<GameoverPopupProps> = ({
  player,
  oponent,
  winner,
}) => {
  return (
    <InformationPopUp
      onClose={() => {}}
      content={
        <Flex position="relative">
          <Box position="absolute" top={-10} left={-10}>
            <img
              src={
                winner
                  ? "images/icons/pastor.png"
                  : "images/icons/sheep_dead.png"
              }
              alt={winner ? "Winner" : "Loser"}
              width={128}
            />
          </Box>

          <MenuContainer>
            <Heading size="40px" color={YELLOW} py={2} mb={2}>
              {winner ? "YOU WIN!" : "YOU LOSE"}
            </Heading>

            <Flex
              flexDirection={winner ? "column" : "column-reverse"}
              gap={4}
              p={4}
            >
              <PlayerResults
                username={player.username}
                points={player.points}
                highlight
                winner={winner}
              />
              <PlayerResults
                username={oponent.username}
                points={oponent.points}
                winner={!winner}
              />
            </Flex>

            <Button variant="secondarySolid">Go to Main Menu</Button>
          </MenuContainer>
        </Flex>
      }
    ></InformationPopUp>
  );
};

import { Box, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { BROWN, BROWN_DARKEST } from "../theme/colors";
import { characterImageMap } from "../constants/characterMap";
import { useGameContext } from "../providers/GameProvider";
import { GridCell } from "../types/GameGrid";

interface GameSidebarMenuProps {
  showHideButton?: boolean;
  showChooseButton?: boolean;
  characterId: number;
  selectedCell: GridCell | null;
}

export const GameSidebarMenu = ({
  showHideButton = true,
  showChooseButton = true,
  characterId,
  selectedCell,
}: GameSidebarMenuProps) => {
  const characterImage = characterImageMap[characterId];
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    submitWolfCommitment,
    wolfKillSheep,
    shepherdMarkSuspicious,
    isWolf,
  } = useGameContext();

  return (
    <Flex
      flexDirection={isMobile ? "row" : "column"}
      gap={4}
      p={2}
      height={isMobile ? "auto" : "100%"}
      width="100%"
      justifyContent={isMobile ? "space-around" : "space-between"}
      alignItems="center"
    >
      <Flex 
        flexDirection={isMobile ? "row" : "column"} 
        gap={4}
        width={isMobile ? "auto" : "100%"}
        justifyContent={isMobile ? "center" : "flex-start"}
      >
        {showHideButton && (
          <Button
            variant="secondarySolid"
            onClick={() => {
              submitWolfCommitment(selectedCell?.value ?? 0);
            }}
            size={isMobile ? "md" : "lg"}
          >
            Hide
          </Button>
        )}
        {showChooseButton && (
          <Button
            variant="secondarySolid"
            onClick={() => {
              if (isWolf) wolfKillSheep(selectedCell?.idx ?? 0);
              else shepherdMarkSuspicious(selectedCell?.idx ?? 0);
            }}
            size={isMobile ? "md" : "lg"}
          >
            Choose
          </Button>
        )}
      </Flex>
      <Box>
        <Box
          boxSize={isMobile ? "150px" : "250px"}
          borderRadius="full"
          bg={BROWN_DARKEST}
          border={`4px solid ${BROWN}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            backgroundImage={`url(${characterImage})`}
            width="100%"
            height="100%"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
          />
        </Box>
      </Box>
    </Flex>
  );
};

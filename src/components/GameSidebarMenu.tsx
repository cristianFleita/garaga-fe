import { Box, Button, Flex } from "@chakra-ui/react";
import { BROWN, BROWN_DARKEST } from "../theme/colors";
import { characterImageMap } from "../constants/characterMap";
import { useGameContext } from "../providers/GameProvider";

interface GameSidebarMenuProps {
  showHideButton?: boolean;
  showChooseButton?: boolean;
  characterId: number;
  selectedCellValue: number | null;
}

export const GameSidebarMenu = ({
  showHideButton = true,
  showChooseButton = true,
  characterId,
  selectedCellValue,
}: GameSidebarMenuProps) => {
  const characterImage = characterImageMap[characterId];

  const {
    submitWolfCommitment,
    wolfKillSheep,
    shepherdMarkSuspicious,
    checkIsWolf,
  } = useGameContext();
  console.log(selectedCellValue);
  return (
    <Flex
      flexDirection="column"
      gap={4}
      p={2}
      height={"100%"}
      justifyContent={"space-around"}
    >
      <Flex flexDirection={"column"} gap={4}>
        {showHideButton && (
          <Button
            variant="secondarySolid"
            onClick={() => {
              submitWolfCommitment(selectedCellValue ?? 0);
            }}
          >
            Hide
          </Button>
        )}
        {showChooseButton && <Button variant="secondarySolid">Choose</Button>}
      </Flex>
      <Flex flexDirection={"column"}>
        <Box
          boxSize="250px"
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
      </Flex>
    </Flex>
  );
};

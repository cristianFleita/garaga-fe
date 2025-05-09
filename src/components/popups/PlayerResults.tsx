import { Flex, Icon, Text } from "@chakra-ui/react";
import { Crown } from "lucide-react";
import {
  YELLOW,
  BROWN,
  BROWN_DARK,
  BROWN_DARKEST,
  BROWN_LIGHT,
} from "../../theme/colors";

interface PlayerResultsProps {
  username: string;
  points: number;
  highlight?: boolean;
  winner?: boolean;
}

export const PlayerResults = ({
  username,
  points,
  highlight = false,
  winner = false,
}: PlayerResultsProps) => {
  return (
    <Flex
      backgroundColor={`${YELLOW}`}
      py={2}
      px={4}
      gap={12}
      justifyContent="space-between"
      alignItems={"center"}
      border={highlight ? `2px solid ${BROWN_LIGHT}` : "none"}
      borderRadius={4}
      boxShadow={highlight ? `0px 0px 4px 2px ${BROWN_DARKEST}` : "none"}
    >
      <Flex alignItems="center" gap={2}>
        {winner && <Icon as={Crown} boxSize={5} color={BROWN} />}
        <Text fontSize="lg" fontWeight="bold" color={BROWN}>
          {username}
        </Text>
      </Flex>
      <Text fontSize="2xl" fontWeight="extrabold" color={`${BROWN}`}>
        {points}
      </Text>
    </Flex>
  );
};

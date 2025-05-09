import { Flex, Text } from "@chakra-ui/react";
import { BROWN } from "../theme/colors";
import { UserComponent } from "./UsernameComponent";

interface GameHeaderProps {
  username: string;
  gameId: number;
  round: number;
}

export const GameHeader = ({ username, gameId, round }: GameHeaderProps) => {
  return (
    <Flex alignItems="center" p={2}>
      <UserComponent username={username} />
      <Text color={BROWN} fontSize="40px" fontWeight={900} ml="auto">
        GAME ID {gameId}
      </Text>
      <Text color={BROWN} fontSize="40px" fontWeight={900} ml="auto">
        ROUND {round}
      </Text>
    </Flex>
  );
};

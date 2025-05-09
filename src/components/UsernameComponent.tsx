import { Box, Flex, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { BROWN, BROWN_DARKEST } from "../theme/colors";

interface UserComponentProps {
  username: string;
}

export const UserComponent: React.FC<UserComponentProps> = ({ username }) => {
  return (
    <Flex p={4} gap={4} alignItems="center">
      <Box
        boxSize="50px"
        borderRadius="full"
        bg={BROWN_DARKEST}
        border={`4px solid ${BROWN}`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FaUser color="white" size="24px" />
      </Box>
      <Text fontWeight="bold" fontSize="sm" color={BROWN}>
        {username}
      </Text>
    </Flex>
  );
};

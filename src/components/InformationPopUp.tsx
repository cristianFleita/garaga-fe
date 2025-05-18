import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InformationPopUpProps {
  content: ReactNode;
  onClose: () => void;
}

export const InformationPopUp = ({
  content,
  onClose,
}: InformationPopUpProps) => {
  return (
    <Flex
      position={"absolute"}
      top={"10%"}
      left={0}
      width={"100%"}
      height={"100%"}
      zIndex={1100}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      backdropFilter="blur(5px)"
      backgroundColor=" rgba(0, 0, 0, 0)"
      gap={6}
      onClick={() => {
        onClose();
      }}
    >
      {content}
    </Flex>
  );
};

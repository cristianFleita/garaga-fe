import { Flex, Text, Image } from "@chakra-ui/react";
// import { FadeInOut } from "../../components/animations/FadeInOut";
import { isMobile } from "react-device-detect";

interface LogoPresentationProps {
  visibleElements?: {
    logo?: boolean;
    text?: boolean;
  };
}

export const LogoPresentation: React.FC<LogoPresentationProps> = ({
  visibleElements = { text: false, logo: false },
}) => {
  return (
    <Flex
      width={"100%"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign={"center"}
      gap={4}
    >
      <Image
        style={{ marginTop: "80px" }}
        width={"60%"}
        margin={"0 auto"}
        mb={4}
        src="/logos/caravana-logo.png"
        alt="logo"
      />

      <Text color="white" fontSize={isMobile ? "1.2rem" : "2.2rem"}>
        PRESENTS
      </Text>
    </Flex>
  );
};

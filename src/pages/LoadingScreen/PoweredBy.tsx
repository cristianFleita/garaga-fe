import { Flex, Image, Text } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

interface PoweredByPresentationProps {
  fadeInDelay?: number;
  visibleElements?: {
    text?: boolean;
    logo1?: boolean;
    logo2?: boolean;
    logo3?: boolean;
  };
}

export const PoweredByPresentation: React.FC<PoweredByPresentationProps> = ({
  visibleElements = { text: true, logo1: true, logo2: true, logo3: true },
  fadeInDelay = 0.5,
}) => {
  const iconWidth = isMobile ? "10vw" : "5vw";

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      textAlign={"center"}
      gap={4}
      mb={16}
      width={"100%"}
    >
      <Text
        paddingLeft="10px"
        color="white"
        fontSize={isMobile ? "1.2rem" : "2.2rem"}
        mb={12}
      >
        POWERED BY
      </Text>
      <Flex
        gap={isMobile ? 8 : 20}
        width={"100%"}
        px={4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="/logos/starknet-logo.png"
          alt="Starknet"
          width={iconWidth}
        />

        <Image src="/logos/dojo-logo.png" alt="Dojo" width={iconWidth} />

        <Image
          src="/logos/cartridge-logo.png"
          alt="Cartridge"
          width={iconWidth}
        />
      </Flex>
    </Flex>
  );
};

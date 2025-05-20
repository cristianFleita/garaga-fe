import { Button, Flex, Image } from "@chakra-ui/react";
import { useDojo } from "../dojo/DojoContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConnect } from "@starknet-react/core";

const isDev = import.meta.env.VITE_DEV === "true";

export const Home = () => {
  const [playButtonClicked, setPlayButtonClicked] = useState(false);
  const { connect, connectors } = useConnect();

  const { account } = useDojo();
  const navigate = useNavigate();

  useEffect(() => {
    if (account?.account && playButtonClicked) {
      navigate("/lobby");
    }
  }, [account, playButtonClicked]);

  return (
    <Flex flexDir={"column"} alignItems={"center"} minH={"100vh"}>
      <Image
        src="images/bg/home-bg.png"
        width={["90%", "80%", "70%", "80%", "100%"]}
        minW={"400px"}
        maxW={"1200px"}
        mt={["20vh", "10vh", "5vh"]}
        objectFit={"contain"}
      />

      <Button
        variant="secondarySolid"
        background={`url(images/bg/btn-bg-1.png)`}
        backgroundSize={"fit"}
        backgroundPosition={"center"}
        onClick={() => {
          if (isDev) {
            navigate("/login");
          } else {
            setPlayButtonClicked(true);
            connect({ connector: connectors[0] });
          }
        }}
        width={"20%"}
        minW={["150px", "300px"]}
        mt={[8, 4]}
      >
        Start
      </Button>
    </Flex>
  );
};

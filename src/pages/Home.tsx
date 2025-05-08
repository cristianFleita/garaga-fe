import { Button, Flex } from "@chakra-ui/react";
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
    <Flex>
      <Button
        variant="secondarySolid"
        onClick={() => {
          if (isDev) {
            navigate("/login");
          } else {
            setPlayButtonClicked(true);
            connect({ connector: connectors[0] });
          }
        }}
        minW={["150px", "300px"]}
      >
        Start
      </Button>
    </Flex>
  );
};

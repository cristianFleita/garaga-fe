import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_ID, LOGGED_USER } from "../constants/localStorage";
import { useCustomToast } from "../hooks/useCustomToast";
import { VIOLET, YELLOW } from "../theme/colors.tsx";
import { useUsername } from "../dojo/utils/useUsername.tsx";
import { MenuContainer } from "../components/MenuContainer.tsx";

const regExpression = /^[a-zA-Z0-9._-]+$/;

export const Login = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const { showErrorToast } = useCustomToast();

  const redirectToGame = () => {
    navigate("/lobby");
  };

  const loggedInUser = useUsername();

  useEffect(() => {
    // if user is logged in, redirect to game
    if (loggedInUser) {
      console.log("redirecting to game", loggedInUser);
      redirectToGame();
    }
  }, [loggedInUser]);

  const validateAndCreateUser = () => {
    if (!username) {
      showErrorToast("No username provided");
      return;
    }
    if (username.length < 3) {
      showErrorToast("The username should be more than 3 characters");
      return;
    }
    if (username.length > 15) {
      showErrorToast("The username should not be longer than 15 characters");
      return;
    }
    // check for characters uppercase and lowercase letters, numbers,. ,- ,_
    // any other character is not allowed
    if (!regExpression.test(username)) {
      showErrorToast("Invalid username");
      return;
    }
    localStorage.removeItem(GAME_ID);
    localStorage.setItem(LOGGED_USER, username);
    redirectToGame();
  };

  const onKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      validateAndCreateUser();
    } else if (event.key === "Escape") {
      navigate("/");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);

    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [onKeyDown]);

  useEffect(() => {
    document.getElementById("usernameInputField")?.focus();
  }, []);

  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <MenuContainer>
          <Heading fontSize={"xxl"} fontWeight={900} mb={4} color={`${YELLOW}`}>
            Welcome
          </Heading>
          <Flex gap={4}>
            <Input
              type="text"
              id="usernameInputField"
              variant={"solid"}
              placeholder="Username"
              ref={inputRef}
              maxLength={15}
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
            />
            <Button
              width="46%"
              onClick={validateAndCreateUser}
              variant="secondarySolid"
            >
              {"Login"}
            </Button>
          </Flex>
          <Flex
            justifyContent="center"
            width={{ base: "90%", sm: "600px" }}
            pt={4}
          >
            <Button
              variant={"secondarySolid"}
              width="46%"
              onClick={() => {
                navigate("/");
              }}
            >
              {"Back"}
            </Button>
          </Flex>
        </MenuContainer>
      </Flex>
    </>
  );
};

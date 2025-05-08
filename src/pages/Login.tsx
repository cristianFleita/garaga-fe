import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_ID, LOGGED_USER } from "../constants/localStorage";
import { useCustomToast } from "../hooks/useCustomToast";
import { VIOLET } from "../theme/colors.tsx";
import { useUsername } from "../dojo/utils/useUsername.tsx";

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
        <Box
          border="2px solid #DAA1E8FF"
          boxShadow={`0px 0px 20px 15px ${VIOLET}`}
          filter="blur(0.5px)"
          backgroundColor="rgba(0, 0, 0, 1)"
          borderRadius="20px"
          display="grid"
          px={[4, 8]}
          py={4}
          pl={[10, 12]}
          width={{ base: "90%", sm: "600px" }}
        >
          <Heading variant="italic" color={VIOLET} size={"m"}>
            {"Login"}
          </Heading>
          <Box
            pt={3}
            mb={6}
            w="95%"
            sx={{
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "1px",
                background: "white",
                boxShadow:
                  "0 0 1px 0px rgba(255, 255, 255), 0 0 8px 1px rgba(255, 255, 255)",
              },
            }}
          >
            <Input
              variant="neon-white"
              id="usernameInputField"
              type="text"
              placeholder={"Enter your username"}
              ref={inputRef}
              maxLength={15}
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
            />
          </Box>
        </Box>
        <Flex
          justifyContent="space-between"
          width={{ base: "90%", sm: "600px" }}
          pt={{ base: 10, sm: 14 }}
        >
          <Button
            width="46%"
            onClick={() => {
              navigate("/");
            }}
          >
            {"Back"}
          </Button>
          <Button
            width="46%"
            onClick={validateAndCreateUser}
            variant="secondarySolid"
          >
            {"Login"}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

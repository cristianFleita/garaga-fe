import { useEffect, useState } from "react";
import { LOGGED_USER } from "../../constants/localStorage";
import { controller } from "../controller/controller";

const isDev = import.meta.env.VITE_DEV === "true";

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!isDev && controller) {
      controller.username()?.then((username) => {
        setUsername(username);
      });
    }
  }, [controller, isDev]);

  return isDev ? window.localStorage.getItem(LOGGED_USER) : username;
};

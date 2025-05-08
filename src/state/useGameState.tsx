import { useState } from "react";
import { useDojo } from "../dojo/DojoContext";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { GAME_ID } from "../constants/localStorage";

export const useGameState = () => {
  const {
    setup: {
      client,
      account: { account },
    },
  } = useDojo();

  const [gameId, setGameId] = useState<number>(getLSGameId());

  const lsSetGameId = (gameId: number) => {
    localStorage.setItem(GAME_ID, gameId.toString());
    setGameId(gameId);
  };

  return {
    gameId,
    setGameId: lsSetGameId,
  };
};

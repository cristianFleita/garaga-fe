import { useEffect, useState } from "react";
import { useDojo } from "../dojo/DojoContext";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { GAME_ID } from "../constants/localStorage";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";
import { GameStateEnum } from "../dojo/typescript/custom";
import { useCells } from "../dojo/queries/useCells";

export const useGameState = () => {
  const {
    setup: {
      client,
      account: { account },
    },
  } = useDojo();

  const [gameId, setGameId] = useState<number>(getLSGameId());
  const [showWaitForPlayer, setShowWaitForPlayer] = useState(false);

  const lsSetGameId = (gameId: number) => {
    localStorage.setItem(GAME_ID, gameId.toString());
    setGameId(gameId);
  };

  const game = useGame();
  const round = useRound();
  const cells = useCells();

  console.log(game);
  console.log(round);

  useEffect(() => {
    if (game?.state == GameStateEnum.Waiting) setShowWaitForPlayer(true);
    else if (game?.state == GameStateEnum.InProgress)
      setShowWaitForPlayer(false);
  }, [game?.state]);

  return {
    gameId,
    setGameId: lsSetGameId,
    showWaitForPlayer,
    cells,
  };
};

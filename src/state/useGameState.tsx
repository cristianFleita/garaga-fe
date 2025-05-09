import { useEffect, useState } from "react";
import { useDojo } from "../dojo/DojoContext";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { GAME_ID } from "../constants/localStorage";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";
import { GameStateEnum } from "../dojo/typescript/custom";
import { useCells } from "../dojo/queries/useCells";
import { CellType, GridCell } from "../types/GameGrid";

export const useGameState = () => {
  const {
    setup: {
      client,
      account: { account },
    },
  } = useDojo();

  const [gameId, setGameId] = useState<number>(getLSGameId());
  const [gridCells, setGridCells] = useState<GridCell[]>([]);
  const [showWaitForPlayer, setShowWaitForPlayer] = useState(false);

  const lsSetGameId = (gameId: number) => {
    localStorage.setItem(GAME_ID, gameId.toString());
    setGameId(gameId);
  };

  const game = useGame();
  const round = useRound();
  const cells = useCells();

  useEffect(() => {
    if (game?.state == GameStateEnum.Waiting) setShowWaitForPlayer(true);
    else if (game?.state == GameStateEnum.InProgress)
      setShowWaitForPlayer(false);
  }, [game?.state]);

  useEffect(() => {
    if (gridCells.length === 0) {
      setGridCells(
        cells.map((cell) => ({
          type: cell.is_alive ? CellType.SHEEP : CellType.SHEEP_DEAD,
        }))
      );
      // console.log(gridCells);
    }
  }, [cells.length, cells]);

  return {
    gameId,
    setGameId: lsSetGameId,
    showWaitForPlayer,
    gridCells,
  };
};

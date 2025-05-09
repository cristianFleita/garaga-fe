import { useEffect, useState } from "react";
import { useDojo } from "../dojo/DojoContext";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { GAME_ID, WOLF_INDEX } from "../constants/localStorage";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";
import { GameStateEnum, RoundStateEnum } from "../dojo/typescript/custom";
import { useCells } from "../dojo/queries/useCells";
import { CellType, GridCell } from "../types/GameGrid";
import { decodeString } from "../dojo/utils/decodeString";

export interface Player {
  username: string;
  points: number;
}

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
  const [isWolf, setIsWolf] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [canHide, setCanHide] = useState(false);
  const [canChoose, setCanChoose] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const lsSetGameId = (gameId: number) => {
    localStorage.setItem(GAME_ID, gameId.toString());
    setGameId(gameId);
  };

  const game = useGame();
  const round = useRound();
  const cells = useCells();

  console.log(cells);
  console.log(game);

  useEffect(() => {
    if (game?.state == GameStateEnum.Waiting) setShowWaitForPlayer(true);
    else if (game?.state == GameStateEnum.InProgress)
      setShowWaitForPlayer(false);

    if (!isPlayerTurn) setShowWaitForPlayer(true);

    if (game?.state == GameStateEnum.Finished) {
      setGameOver(true);
      setShowWaitForPlayer(false);
    }
  }, [game?.state, isPlayerTurn]);

  useEffect(() => {
    setCanChoose(
      (round?.state.toString() == RoundStateEnum.WaitingForSheepToKill ||
        round?.state.toString() == RoundStateEnum.WaitingForWolfSelection) &&
        isPlayerTurn
    );
  }, [round?.state, isPlayerTurn]);

  useEffect(() => {
    setIsWolf(
      decodeString(account.address) == decodeString(game?.wolf.toString() ?? "")
    );
  }, [game?.wolf]);

  useEffect(() => {
    setCanHide(
      RoundStateEnum.WaitingForWolfCommitment == round?.state.toString() &&
        isWolf
    );
  }, [round?.state, isWolf]);

  useEffect(() => {
    setIsPlayerTurn(
      decodeString(account.address) == decodeString(round?.current_turn ?? "")
    );
  }, [round?.current_turn]);

  useEffect(() => {
    if (gridCells.length === 0) {
      const lsWolfValue = Number(localStorage.getItem(WOLF_INDEX)) ?? 0;
      setGridCells(
        cells.map((cell) => ({
          type:
            isWolf && cell.value == lsWolfValue
              ? CellType.SHEEP_FAKE
              : cell.is_alive
                ? CellType.SHEEP
                : CellType.SHEEP_DEAD,
          value: cell.value,
          idx: cell.idx,
        }))
      );
    }
  }, [cells.length, cells]);

  return {
    gameId,
    setGameId: lsSetGameId,
    showWaitForPlayer,
    gridCells,
    isWolf,
    isPlayerTurn,
    canHide,
    canChoose,
    gameOver,
  };
};

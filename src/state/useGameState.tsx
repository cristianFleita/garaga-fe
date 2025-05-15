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
import { num } from "starknet";

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
  const [player, setPlayer] = useState<Player>({ username: "", points: 0 });
  const [oponent, setOponent] = useState<Player>({ username: "", points: 0 });
  const [winner, setWinner] = useState(false);

  const lsSetGameId = (gameId: number) => {
    localStorage.setItem(GAME_ID, gameId.toString());
    setGameId(gameId);
  };

  const game = useGame();
  const round = useRound();
  const cells = useCells();

  console.log(round);
  console.log(game);
  console.log(cells);

  useEffect(() => {
    if (game?.state == GameStateEnum.Waiting) setShowWaitForPlayer(true);
    else if (game?.state == GameStateEnum.InProgress)
      setShowWaitForPlayer(false);

    if (!isPlayerTurn) setShowWaitForPlayer(true);

    if (game?.state == GameStateEnum.Finished) {
      const winner = num.toHexString(game?.winner.toString() ?? 0);
      setWinner(winner === account.address);
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

  useEffect(() => {
    const player1 = num.toHexString(game?.player_1.toString() ?? 0);
    const player2 = num.toHexString(game?.player_2.toString() ?? 0);

    const isPlayer1 = player1 === account.address;

    setPlayer({
      username: isPlayer1 ? player1 : player2,
      points: isPlayer1 ? game?.player_1_score ?? 0 : game?.player_2_score ?? 0,
    });

    setOponent({
      username: isPlayer1 ? player2 : player1,
      points: isPlayer1 ? game?.player_2_score ?? 0 : game?.player_1_score ?? 0,
    });
  }, [game?.player_1_score, game?.player_2_score]);

  const resetState = () => {
    setShowWaitForPlayer(false);
    setIsWolf(false);
    setIsPlayerTurn(false);
    setCanHide(false);
    setCanChoose(false);
    setWinner(false);
    setGameOver(false);
    setPlayer({ username: "", points: 0 });
    setOponent({ username: "", points: 0 });
  };

  const getCellByValue = (value: number) => {
    return cells.find((cell) => cell.value === value);
  };

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
    player,
    oponent,
    winner,
    resetState,
    getCellByValue,
    cells,
  };
};

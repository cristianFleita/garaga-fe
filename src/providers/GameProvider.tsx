import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { gameProviderDefaults } from "./GameProviderDefaults";
import { Player, useGameState } from "../state/useGameState";
import { useGameActions } from "../dojo/useGameActions";
import { GAME_ID, WOLF_INDEX, WOLF_SALT } from "../constants/localStorage";
import { poseidonHashBN254 } from "garaga";

import { gameExists } from "../dojo/utils/getGame";
import { useDojo } from "../dojo/DojoContext";
import { useNavigate } from "react-router-dom";
import { GridCell } from "../types/GameGrid";
import { useRound } from "../dojo/queries/useRound";
import { RoundStateEnum } from "../dojo/typescript/custom";
import { num } from "starknet";
import { useGame } from "../dojo/queries/useGame";

export interface IGameContext {
  gameId: number;
  executeCreateGame: () => void;
  joinGame: (gameId: number) => void;
  submitWolfCommitment: (selectedWolfIndex: number) => void;
  checkOrCreateGame: () => void;
  wolfKillSheep: (sheepIdx: number) => void;
  shepherdMarkSuspicious: (sheepIdx: number) => void;
  checkIsWolf: () => void;
  showWaitForPlayer: boolean;
  gridCells: GridCell[];
  isWolf: boolean;
  isPlayerTurn: boolean;
  canHide: boolean;
  canChoose: boolean;
  gameOver: boolean;
  player: Player;
  oponent: Player;
  winner: boolean;
  resetGame: () => void;
}

const GameContext = createContext<IGameContext>(gameProviderDefaults);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: PropsWithChildren) => {
  const {
    setup: {
      clientComponents: { Game },
    },
  } = useDojo();

  const navigate = useNavigate();
  const state = useGameState();
  const round = useRound();
  const game = useGame();

  const {
    gameId,
    setGameId,
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
  } = state;

  const {
    createGame,
    joinGame,
    submitWolfCommitment,
    wolfKillSheep,
    shepherdMarkSuspicious,
    checkIsWolf,
  } = useGameActions();

  function generateRandomSalt() {
    return BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  }

  useEffect(() => {
    const wolfPlayer = num.toHexString(game?.wolf.toString() ?? 0);
    if (
      round?.state.toString() == RoundStateEnum.WaitingForWolfResult &&
      wolfPlayer === player.username
    ) {
      executeCheckIsWolf();
    }

    if (round?.state.toString() == RoundStateEnum.WaitingForWolfCommitment) {
      localStorage.removeItem(WOLF_INDEX);
    }
  }, [round?.state]);

  // TODO: Use on game page
  const checkOrCreateGame = async () => {
    console.log("checking game exists", gameId);
    if (!gameId || gameId === 0 || !gameExists(Game, gameId)) {
      setTimeout(() => {
        if (!gameExists(Game, gameId)) {
          executeCreateGame();
        } else {
          console.log("Game found (2), no need to create a new one");
        }
      }, 5000);
    } else {
      console.log("Game found, no need to create a new one");
    }
  };

  const executeCreateGame = async () => {
    try {
      createGame().then(async (response) => {
        const { gameId: newGameId } = response;
        if (newGameId) {
          //TODO: Reset any game state
          setGameId(newGameId);
          localStorage.setItem(GAME_ID, newGameId.toString());
          console.log(`game ${newGameId} created`);

          navigate("/game");
        }
      });
    } catch {
      console.error("Error creating game");
    }
  };

  const executeJoinGame = async (gameId: number) => {
    if (!gameId || gameId <= 0) {
      console.error("ID de juego inválido");
      return;
    }

    // Verificar primero si el juego existe
    if (!gameExists(Game, gameId)) {
      console.error(`El juego con ID ${gameId} no existe`);
      return;
    }

    try {
      console.log(`Intentando unirse al juego ${gameId}...`);
      
      const result = await joinGame(gameId).catch((error) => {
        console.error("Error en la llamada a joinGame:", error);
        throw error;
      });
      
      // Solo configurar el ID y navegar si la unión fue exitosa
      setGameId(gameId);
      localStorage.setItem(GAME_ID, gameId.toString());
      navigate("/game");
      console.log("Unido exitosamente al juego:", gameId);
    } catch (error) {
      console.error("Error al unirse al juego:", error);
    }
  };

  const executeSubmitWolfCommitment = async (selectedSheepValue: number) => {
    try {
      const wolfSalt = generateRandomSalt();
      const wolfCommitment = poseidonHashBN254(
        BigInt(selectedSheepValue),
        BigInt(wolfSalt)
      ).toString();

      localStorage.setItem(WOLF_INDEX, selectedSheepValue.toString());
      localStorage.setItem(WOLF_SALT, wolfSalt.toString());

      console.log("SubmitWolfCommitment - wolfCommitment: ", wolfCommitment);

      submitWolfCommitment(gameId, wolfCommitment).then(() => {
        console.log("submited successfully");
      });
    } catch (e) {
      console.error("Error submitting wolf commitment", e);
    }
  };

  const executeKillSheep = async (sheepToKillIndex: number) => {
    try {
      const wolfValue = BigInt(localStorage.getItem(WOLF_INDEX) ?? 0);
      const wolfCommitment = poseidonHashBN254(
        BigInt(wolfValue),
        BigInt(localStorage.getItem(WOLF_SALT) ?? 0)
      ).toString();
      const wolf_index = getCellByValue(Number(wolfValue));

      const sheepPositions = cells.map((cell) => cell.value);
      const sheepAlive = cells.map((cell) => cell.is_alive);

      await wolfKillSheep(
        gameId,
        Number(wolfValue),
        localStorage.getItem(WOLF_SALT) ?? "0",
        wolf_index?.idx ?? 0,
        sheepPositions,
        sheepAlive,
        sheepToKillIndex,
        wolfCommitment
      ).then(() => {
        console.log("Sheep killed successfully");
      });
    } catch (e) {
      console.error("Error submitting wolf commitment", e);
    }
  };

  const executeMarkSheep = async (sheepToMarkIndex: number) => {
    try {
      await shepherdMarkSuspicious(gameId, Number(sheepToMarkIndex)).then(
        () => {
          console.log("Sheep selected successfully");
        }
      );
    } catch (e) {
      console.error("Error selecting the suspected sheep", e);
    }
  };

  const executeCheckIsWolf = async () => {
    console.log("executeCheckIsWolf");
    try {
      const wolfValue = BigInt(localStorage.getItem(WOLF_INDEX) ?? 0);
      const wolfCommitment = poseidonHashBN254(
        BigInt(wolfValue),
        BigInt(localStorage.getItem(WOLF_SALT) ?? 0)
      ).toString();
      const wolf_index = getCellByValue(Number(wolfValue));

      const sheepPositions = cells.map((cell) => cell.value);
      const sheepAlive = cells.map((cell) => cell.is_alive);

      const cell = cells.find(
        (cell) => cell.idx === round?.suspicious_sheep_index
      );

      const isWolf = cell?.value === Number(wolfValue);

      await checkIsWolf(
        gameId,
        Number(wolfValue),
        localStorage.getItem(WOLF_SALT) ?? "0",
        wolf_index?.idx ?? 0,
        sheepPositions,
        sheepAlive,
        round?.suspicious_sheep_index ?? 0,
        wolfCommitment,
        Number(isWolf)
      ).then(() => {
        console.log("Wolf checked successfully");
      });
    } catch (e) {
      console.error("Error checking wolf", e);
    }
  };

  const resetGame = () => {
    localStorage.removeItem(GAME_ID);
    localStorage.removeItem(WOLF_INDEX);
    localStorage.removeItem(WOLF_SALT);
    resetState();
  };

  const actions = {
    executeCreateGame,
    joinGame: executeJoinGame,
    checkOrCreateGame,
    submitWolfCommitment: executeSubmitWolfCommitment,
    wolfKillSheep: executeKillSheep,
    shepherdMarkSuspicious: executeMarkSheep,
    checkIsWolf: executeCheckIsWolf,
    resetGame,
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        ...actions,
        gridCells,
        isWolf,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

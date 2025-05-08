import { PropsWithChildren, createContext, useContext } from "react";
import { gameProviderDefaults } from "./GameProviderDefaults";
import { useGameState } from "../state/useGameState";
import { useGameActions } from "../dojo/useGameActions";
import { GAME_ID, WOLF_INDEX, WOLF_SALT } from "../constants/localStorage";
import { poseidonHashBN254 } from "garaga";

import { gameExists } from "../dojo/utils/getGame";
import { useDojo } from "../dojo/DojoContext";

export interface IGameContext {
  gameId: number;
  executeCreateGame: () => void;
  joinGame: (gameId: number) => void;
  submitWolfCommitment: (selectedWolfIndex: number) => void;
  checkOrCreateGame: () => void;
  wolfKillSheep: (sheepIdx: number) => void;
  shepherdMarkSuspicious: (sheepIdx: number) => void;
  checkIsWolf: () => void;
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

  const state = useGameState();

  const { gameId, setGameId } = state;

  const {
    createGame,
    joinGame,
    submitWolfCommitment,
    wolfKillSheep,
    shepherdMarkSuspicious,
    checkIsWolf,
  } = useGameActions();

  function generateRandomSalt() {
    // Generar un número aleatorio grande para usar como salt
    return BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  }

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

          // TODO: navigate to game
        }
      });
    } catch {
      console.error("Error creating game");
    }
  };

  const executeJoinGame = async (gameId: number) => {
    try {
      joinGame(gameId).then(() => {
        // TODO: navigate to game
        console.log("Join into game: " + gameId);
      });
    } catch {
      console.error("Error joining game");
    }
  };

  const executeSubmitWolfCommitment = async (selectedSheepValue: number) => {
    try {
      const wolfSalt = generateRandomSalt();
      const wolfCommitment = poseidonHashBN254(
        BigInt(wolfSalt),
        BigInt(selectedSheepValue)
      );

      localStorage.setItem(WOLF_INDEX, selectedSheepValue.toString());
      localStorage.setItem(WOLF_SALT, wolfSalt.toString());

      submitWolfCommitment(gameId, Number(wolfCommitment)).then(() => {
        console.log("submited successfully");
      });
    } catch (e) {
      console.error("Error submitting wolf commitment", e);
    }
  };

  const executeKillSheep = async (sheepToKillIndex: number) => {
    try {
      await wolfKillSheep(gameId, Number(sheepToKillIndex)).then(() => {
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
    try {
      await checkIsWolf(gameId).then(() => {
        console.log("Wolf checked successfully");
      });
    } catch (e) {
      console.error("Error checking wolf", e);
    }
  };

  const actions = {
    executeCreateGame,
    joinGame: executeJoinGame,
    checkOrCreateGame,
    submitWolfCommitment: executeSubmitWolfCommitment,
    wolfKillSheep: executeKillSheep,
    shepherdMarkSuspicious: executeMarkSheep,
    checkIsWolf: executeCheckIsWolf,
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        ...actions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

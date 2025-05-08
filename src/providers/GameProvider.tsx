import { PropsWithChildren, createContext, useContext } from "react";
import { gameProviderDefaults } from "./GameProviderDefaults";
import { useGameState } from "../state/useGameState";
import { useGameActions } from "../dojo/useGameActions";
import { GAME_ID } from "../constants/localStorage";
import { gameExists } from "../dojo/utils/getGame";
import { useDojo } from "../dojo/DojoContext";

export interface IGameContext {
  gameId: number;
  executeCreateGame: () => void;
  joinGame: (gameId: number) => void;
  checkOrCreateGame: () => void;
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

  const { createGame, joinGame } = useGameActions();

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

  const actions = { executeCreateGame, joinGame, checkOrCreateGame };

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

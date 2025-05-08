import { PropsWithChildren, createContext, useContext } from "react";
import { gameProviderDefaults } from "./GameProviderDefaults";
import { useGameState } from "../state/useGameState";
import { useGameActions } from "../dojo/useGameActions";

export interface IGameContext {
  executeCreateGame: () => void;
  joinGame: (gameId: number) => void;
}

const GameContext = createContext<IGameContext>(gameProviderDefaults);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: PropsWithChildren) => {
  const state = useGameState();

  const { createGame, joinGame } = useGameActions();

  const executeCreateGame = async () => {
    try {
      createGame();
    } catch {
      console.error("Error creating game");
    }
  };

  const actions = { executeCreateGame, joinGame };

  return (
    <GameContext.Provider
      value={{
        ...actions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

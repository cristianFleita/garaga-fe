import { IGameContext } from "./GameProvider";

export const gameProviderDefaults: IGameContext = {
  executeCreateGame: async () => {},
  gameId: 0,
  joinGame: (_) => {},
  submitWolfCommitment: (_) => {},
  checkOrCreateGame: () => {},
  wolfKillSheep: (_) => {},
  shepherdMarkSuspicious: (_) => {},
  checkIsWolf: () => {},
  showWaitForPlayer: false,
  gridCells: [],
};

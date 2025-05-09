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
  isWolf: false,
  isPlayerTurn: false,
  canHide: false,
  canChoose: false,
  gameOver: false,
  player: { username: "", points: 0 },
  oponent: { username: "", points: 0 },
  winner: false,
};

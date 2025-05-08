// export enum EventTypeEnum {
//   Cash,
//   Club,
//   Diamond,
//   Point,
//   Multi,
//   Neon,
//   Spade,
//   Heart,
// }

export enum GameStateEnum {
  Waiting = "WaitingForPlayer2",
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Finished = "Finished",
}

export enum RoundStateEnum {
  WaitingForWolfCommitment = "WaitingForWolfCommitment",
  WaitingForSheepToKill = "WaitingForSheepToKill",
  WaitingForWolfSelection = "WaitingForWolfSelection",
  WaitingForWolfResult = "WaitingForWolfResult",
}

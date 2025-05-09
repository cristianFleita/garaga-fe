export enum CellType {
  EMPTY = "",
  SHEEP = "images/icons/sheep.png",
  SHEEP_DEAD = "images/icons/sheep_dead.png",
  SHEEP_FAKE = "images/icons/sheep_fake.png",
}

export interface GridCell {
  type: CellType;
  idx: number;
  value: number;
}

export const EmptyGridCell: GridCell = {
  type: CellType.EMPTY,
  idx: -1,
  value: -1,
};

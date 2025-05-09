export enum CellType {
  EMPTY = "",
  SHEEP = "images/icons/sheep.png",
  SHEEP_DEAD = "images/icons/sheep_dead.png",
  SHEEP_FAKE = "images/icons/sheep_fake.png",
}

export interface GridCell {
  type: CellType;
  value: number;
}

export const EmptyGridCell: GridCell = {
  type: CellType.EMPTY,
  value: -1,
};

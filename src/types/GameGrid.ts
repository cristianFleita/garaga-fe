export enum CellType {
    EMPTY = "",
    SHEEP = "images/sheep.png",
    SHEEP_DEAD = "images/sheep_dead.png",
    SHEEP_FAKE = "images/sheep_fake.png",
  }
  
  export interface GridCell {
    type: CellType;
  }
  
  export const EmptyGridCell: GridCell = {
    type: CellType.EMPTY,
  };
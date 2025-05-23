import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { BROWN, BROWN_DARKEST } from "../theme/colors";
import { EmptyGridCell, GridCell } from "../types/GameGrid";

interface GameGridProps {
  cells?: GridCell[];
  canSelect?: boolean;
  setSelectedCell: (index: GridCell) => void;
  selectionColor?: string;
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
}

export const GameGrid = ({
  cells,
  canSelect = false,
  setSelectedCell,
  selectionColor = "white",
  selectedIndex,
  setSelectedIndex,
}: GameGridProps) => {
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleSelect = (cell: GridCell) => {
    if (canSelect) {
      setSelectedIndex(cell.idx);
      setSelectedCell(cell);
    }
  };

  const filledCells =
    !cells || cells.length === 0 ? Array(16).fill(EmptyGridCell) : cells;

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(4, 1fr)"
      gap={2}
      p={2}
      height="100%"
      width="100%"
      overflow="hidden"
      maxHeight="100%"
      aspectRatio="1"
    >
      {filledCells.map((cell, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Box
            key={index}
            width="100%"
            height="100%"
            aspectRatio="1"
            borderRadius="md"
            backgroundColor={BROWN_DARKEST}
            border={`2px solid ${BROWN}`}
            backgroundImage={`url(${cell.type})`}
            backgroundSize="contain"
            backgroundRepeat={"no-repeat"}
            backgroundPosition="center"
            transition="all 0.2s ease-in-out"
            transform={isSelected ? "scale(1.05)" : "scale(1)"}
            boxShadow={isSelected ? `0 0 0 2px ${selectionColor}` : "none"}
            cursor={canSelect ? "pointer" : "default"}
            onClick={() => handleSelect(cell)}
            overflow="hidden"
          />
        );
      })}
    </Grid>
  );
};

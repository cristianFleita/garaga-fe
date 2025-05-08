import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../DojoContext";
import { getLSGameId } from "../utils/getLSGameId";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { Cell } from "../../types/Cell";
import { useEffect, useState } from "react";

const GRID_SIZE = 16;

export const useCells = (): Cell[] => {
  const {
    setup: {
      clientComponents: { Cell },
    },
  } = useDojo();

  const gameId = getLSGameId();

  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    const loadCells = () => {
      if (!gameId) return;

      const newCells: Cell[] = [];

      for (let i = 0; i < GRID_SIZE; i++) {
        const entityId = getEntityIdFromKeys([
          BigInt(gameId),
          BigInt(i),
        ]) as Entity;

        const cell = getComponentValue(Cell, entityId);
        if (cell) {
          newCells.push(cell);
        }
      }

      setCells(newCells);
    };

    loadCells();

    // Retry if no cells were found
    if (cells.length === 0) {
      const retryTimeout = setTimeout(() => {
        loadCells();
      }, 1000);

      return () => clearTimeout(retryTimeout);
    }
  }, [gameId, Cell, cells.length]);

  return cells;
};

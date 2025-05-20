import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../DojoContext";
import { getLSGameId } from "../utils/getLSGameId";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { Cell } from "../../types/Cell";
import { useEffect, useState, useRef } from "react";
import { useRound } from "./useRound";
import { useGame } from "./useGame";

const GRID_SIZE = 16;
const POLLING_INTERVAL = 2000; // Verificar cada 2 segundos

export const useCells = (): Cell[] => {
  const {
    setup: {
      clientComponents: { Cell },
    },
  } = useDojo();

  const gameId = getLSGameId();
  const round = useRound();
  const game = useGame();
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const [cells, setCells] = useState<Cell[]>([]);

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

    // Solo actualizar si hay un cambio o si no teníamos celdas antes
    if (newCells.length > 0 && (
      cells.length === 0 || 
      JSON.stringify(newCells) !== JSON.stringify(cells)
    )) {
      console.log("Actualizando celdas desde useCells");
      setCells(newCells);
    }
  };

  // Efecto para cargar las celdas inicialmente y cuando cambian las dependencias
  useEffect(() => {
    loadCells();

    // Retry if no cells were found
    if (cells.length === 0) {
      const retryTimeout = setTimeout(() => {
        loadCells();
      }, 1000);

      return () => clearTimeout(retryTimeout);
    }
  }, [
    gameId,
    Cell,
    round?.current_turn,
    round?.state,
    round?.surviving_sheep,
    game?.state,
  ]);

  // Efecto para el polling periódico (verificación continua)
  useEffect(() => {
    // Iniciar el polling
    pollingRef.current = setInterval(() => {
      loadCells();
    }, POLLING_INTERVAL);

    // Limpiar al desmontar
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [gameId]);

  return cells;
};

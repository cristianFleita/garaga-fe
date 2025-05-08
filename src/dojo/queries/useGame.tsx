import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useMemo } from "react";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";

export const useGame = () => {
  const {
    setup: {
      clientComponents: { Game },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = useMemo(
    () => getEntityIdFromKeys([BigInt(gameId)]) as Entity,
    [gameId]
  );
  return useComponentValue(Game, entityId);
};

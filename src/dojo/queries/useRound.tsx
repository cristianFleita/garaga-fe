import { useMemo } from "react";
import { useDojo } from "../DojoContext";
import { getLSGameId } from "../utils/getLSGameId";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity } from "@dojoengine/recs";
import { useComponentValue } from "@dojoengine/react";

export const useRound = () => {
  const {
    setup: {
      clientComponents: { Round },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = useMemo(
    () => getEntityIdFromKeys([BigInt(gameId)]) as Entity,
    [gameId]
  );
  return useComponentValue(Round, entityId);
};

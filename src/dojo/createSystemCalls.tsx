import { World } from "@dojoengine/recs";

import { ClientComponents } from "./createClientComponents";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: any },
  {}: ClientComponents,
  world: World
) {
  return {};
}
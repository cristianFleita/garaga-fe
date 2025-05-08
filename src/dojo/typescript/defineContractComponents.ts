import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<
  ReturnType<typeof defineContractComponents>
>;

const DOJO_NAMESPACE =
  import.meta.env.VITE_DOJO_NAMESPACE || "jokers_of_neon_core";

export function defineContractComponents(world: World) {
  return {
    Game: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          round_count: RecsType.Number,
          state: RecsType.String,
          player_1: RecsType.BigInt,
          player_2: RecsType.BigInt,
          shepherd: RecsType.BigInt,
          wolf: RecsType.BigInt,
          player_1_score: RecsType.Number,
          player_2_score: RecsType.Number,
          winner: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "Game",
            types: [
              "u32",
              "u32",
              "GameState",
              "ContractAddress",
              "ContractAddress",
              "ContractAddress",
              "ContractAddress",
              "u32",
              "u32",
              "ContractAddress",
            ],
            customTypes: [],
          },
        }
      );
    })(),

    Round: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          wolf_commitment: RecsType.Number,
          surviving_sheep: RecsType.Number,
          state: RecsType.Number,
          suspicious_sheep_index: RecsType.Number,
          current_turn: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "Round",
            types: [
              "u32",
              "u256",
              "u32",
              "RoundState",
              "u32",
              "ContractAddress",
            ],
            customTypes: [],
          },
        }
      );
    })(),

    Cell: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          idx: RecsType.Number,
          value: RecsType.Number,
          is_alive: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "Cell",
            types: ["u32", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),
  };
}

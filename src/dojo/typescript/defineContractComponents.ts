import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<
  ReturnType<typeof defineContractComponents>
>;

const DOJO_NAMESPACE =
  import.meta.env.VITE_DOJO_NAMESPACE || "jokers_of_neon_core";

export function defineContractComponents(world: World) {
  return {
    // Model definition for `jokers_of_neon_core::models::status::shop::shop::BlisterPackItem` model
    BlisterPackItem: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          idx: RecsType.Number,
          blister_pack_id: RecsType.Number,
          cost: RecsType.Number,
          cost_discount: RecsType.Number,
          purchased: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BlisterPackItem",
            types: ["u32", "u32", "u32", "u32", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::shop::shop::BlisterPackResult` model
    BlisterPackResult: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          cards_picked: RecsType.Boolean,
          cards: RecsType.NumberArray,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BlisterPackResult",
            types: ["u32", "bool", "array"],
            customTypes: [],
          },
        }
      );
    })(),

    // Type definition for `jokers_of_neon_core::models::status::shop::shop::BurnItem` struct
    BurnItem: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          cost: RecsType.Number,
          purchased: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BurnItem",
            types: ["u32", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::BuyBlisterPackEvent` model
    BuyBlisterPackEvent: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          level: RecsType.Number,
          idx: RecsType.Number,
          blister_pack_id: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BuyBlisterPackEvent",
            types: ["u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::BuyCardEvent` model
    BuyCardEvent: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          level: RecsType.Number,
          idx: RecsType.Number,
          item_type: RecsType.String,
          card_id: RecsType.Number,
          temporary: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BuyCardEvent",
            types: ["u32", "u32", "u32", "CardItemType", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::BuyPokerHandEvent` model
    BuyPokerHandEvent: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          level: RecsType.Number,
          idx: RecsType.Number,
          poker_hand: RecsType.String,
          level_hand: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BuyPokerHandEvent",
            types: ["u32", "u32", "u32", "PokerHand", "u8"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::BuyRerollEvent` model
    BuyRerollEvent: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          level: RecsType.Number,
          reroll_cost: RecsType.Number,
          reroll_executed: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "BuyRerollEvent",
            types: ["u32", "u32", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::shop::shop::CardItem` model
    CardItem: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          idx: RecsType.Number,
          item_type: RecsType.String,
          card_id: RecsType.Number,
          cost: RecsType.Number,
          purchased: RecsType.Boolean,
          temporary: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "CardItem",
            types: ["u32", "u32", "CardItemType", "u32", "u32", "bool", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::CardScoreEvent` model
    CardScoreEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          index: RecsType.Number,
          multi: RecsType.Number,
          points: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "CardScoreEvent",
            types: ["ContractAddress", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::CreateGameEvent` model
    CreateGameEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "CreateGameEvent",
            types: ["ContractAddress", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::round::current_hand_card::CurrentHand` model
    CurrentHand: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          cards: RecsType.NumberArray,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "CurrentHand",
            types: ["u32", "array"],
            customTypes: [],
          },
        }
      );
    })(),

    GamePowerUp: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          power_ups: RecsType.NumberArray,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "GamePowerUp",
            types: ["u32", "array"],
            customTypes: [],
          },
        }
      );
    })(),

    CurrentHandEvent: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          cards: RecsType.NumberArray,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "CurrentHandEvent",
            types: ["u32", "array"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::game::game::CurrentSpecialCards` model
    CurrentSpecialCards: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          idx: RecsType.Number,
          effect_card_id: RecsType.Number,
          is_temporary: RecsType.Boolean,
          remaining: RecsType.Number,
          selling_price: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "CurrentSpecialCards",
            types: ["u32", "u32", "u32", "bool", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::game_deck::DeckCard` model
    DeckCard: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          index: RecsType.Number,
          card_id: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "DeckCard",
            types: ["u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::DetailEarnedEvent` model
    DetailEarnedEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          round_defeat: RecsType.Number,
          level_bonus: RecsType.Number,
          hands_left: RecsType.Number,
          hands_left_cash: RecsType.Number,
          discard_left: RecsType.Number,
          discard_left_cash: RecsType.Number,
          rage_card_defeated: RecsType.Number,
          rage_card_defeated_cash: RecsType.Number,
          total: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "DetailEarnedEvent",
            types: [
              "ContractAddress",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
            ],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::game::game::Game` model
    Game: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          mod_id: RecsType.String,
          state: RecsType.String,
          owner: RecsType.BigInt,
          player_name: RecsType.BigInt,
          player_score: RecsType.Number,
          level: RecsType.Number,
          current_node_id: RecsType.Number,
          hand_len: RecsType.Number,
          plays: RecsType.Number,
          discards: RecsType.Number,
          current_specials_len: RecsType.Number,
          special_slots: RecsType.Number,
          cash: RecsType.Number,
          available_rerolls: RecsType.Number,
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
              "felt252",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
              "u32",
            ],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::game_deck::GameDeck` model
    GameDeck: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          len: RecsType.Number,
          round_len: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "GameDeck",
            types: ["u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::ModifierCardSuitEvent` model
    ModifierCardSuitEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          modifier_card_idx: RecsType.Number,
          current_hand_card_idx: RecsType.Number,
          suit: RecsType.String,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "ModifierCardSuitEvent",
            types: ["ContractAddress", "u32", "u32", "u32", "Suit"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::NeonPokerHandEvent` model
    NeonPokerHandEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          neon_cards_idx: RecsType.NumberArray,
          multi: RecsType.Number,
          points: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "NeonPokerHandEvent",
            types: ["ContractAddress", "u32", "array", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::PlayGameOverEvent` model
    PlayGameOverEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "PlayGameOverEvent",
            types: ["ContractAddress", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::PlayPokerHandEvent` model
    PlayPokerHandEvent: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          level: RecsType.Number,
          count_hand: RecsType.Number,
          poker_hand: RecsType.String,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "PlayPokerHandEvent",
            types: ["u32", "u32", "u8", "PokerHand"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::PlayWinGameEvent` model
    PlayWinGameEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          level: RecsType.Number,
          player_score: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "PlayWinGameEvent",
            types: ["ContractAddress", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::game::player::PlayerLevelPokerHand` model
    PlayerLevelPokerHand: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          poker_hand: RecsType.String,
          level: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "PlayerLevelPokerHand",
            types: ["u32", "PokerHand", "u8"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::PokerHandEvent` model
    PokerHandEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          poker_hand: RecsType.Number,
          multi: RecsType.Number,
          points: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "PokerHandEvent",
            types: ["ContractAddress", "u8", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::shop::shop::PokerHandItem` model
    PokerHandItem: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          idx: RecsType.Number,
          poker_hand: RecsType.String,
          level: RecsType.Number,
          cost: RecsType.Number,
          purchased: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "PokerHandItem",
            types: ["u32", "u32", "PokerHand", "u8", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::game::rage::RageRound` model
    RageRound: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          is_active: RecsType.Boolean,
          current_probability: RecsType.Number,
          active_rage_ids: RecsType.NumberArray,
          last_active_level: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "RageRound",
            types: ["u32", "bool", "u16", "array", "u8"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::round::round::Round` model
    Round: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          current_score: RecsType.Number,
          target_score: RecsType.Number,
          remaining_plays: RecsType.Number,
          remaining_discards: RecsType.Number,
          rages: RecsType.NumberArray,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "Round",
            types: ["u64", "u32", "u32", "u16", "u16", "array"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::RoundScoreEvent` model
    RoundScoreEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          player_score: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "RoundScoreEvent",
            types: ["ContractAddress", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::shop::shop::Shop` model
    Shop: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          reroll_cost: RecsType.Number,
          reroll_executed: RecsType.Boolean,
          len_item_common_cards: RecsType.Number,
          len_item_modifier_cards: RecsType.Number,
          len_item_special_cards: RecsType.Number,
          len_item_poker_hands: RecsType.Number,
          len_item_blister_pack: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "Shop",
            types: ["u32", "u32", "bool", "u32", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::status::shop::shop::SlotSpecialCardsItem` model
    SlotSpecialCardsItem: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          cost: RecsType.Number,
          purchased: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SlotSpecialCardsItem",
            types: ["u32", "u32", "bool"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::SpecialCashEvent` model
    SpecialCashEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          cash: RecsType.Number,
          card_idx: RecsType.Number,
          special_idx: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SpecialCashEvent",
            types: ["ContractAddress", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::SpecialGlobalEvent` model
    SpecialGlobalEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          current_special_card_idx: RecsType.Number,
          multi: RecsType.Number,
          points: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SpecialGlobalEvent",
            types: ["ContractAddress", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::SpecialModifierMultiEvent` model
    SpecialModifierMultiEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          current_special_card_idx: RecsType.Number,
          current_hand_card_idx: RecsType.Number,
          multi: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SpecialModifierMultiEvent",
            types: ["ContractAddress", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::SpecialModifierPointsEvent` model
    SpecialModifierPointsEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          current_special_card_idx: RecsType.Number,
          current_hand_card_idx: RecsType.Number,
          points: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SpecialModifierPointsEvent",
            types: ["ContractAddress", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::SpecialModifierSuitEvent` model
    SpecialModifierSuitEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          current_special_card_idx: RecsType.Number,
          current_hand_card_idx: RecsType.Number,
          suit: RecsType.String,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SpecialModifierSuitEvent",
            types: ["ContractAddress", "u32", "u32", "u32", "Suit"],
            customTypes: [],
          },
        }
      );
    })(),

    // Model definition for `jokers_of_neon_core::models::data::events::SpecialPokerHandEvent` model
    SpecialPokerHandEvent: (() => {
      return defineComponent(
        world,
        {
          player: RecsType.BigInt,
          game_id: RecsType.Number,
          current_special_card_idx: RecsType.Number,
          multi: RecsType.Number,
          points: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "SpecialPokerHandEvent",
            types: ["ContractAddress", "u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),

    GameMod: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          name: RecsType.BigInt,
          owner: RecsType.BigInt,
          loot_boxes_info_system_address: RecsType.BigInt,
          specials_info_system_address: RecsType.BigInt,
          total_games: RecsType.Number,
        },
        {
          metadata: {
            namespace: DOJO_NAMESPACE,
            name: "GameMod",
            types: [
              "u32",
              "felt252",
              "ContractAddress",
              "ContractAddress",
              "ContractAddress",
              "u32",
            ],
            customTypes: [],
          },
        }
      );
    })(),
  };
}

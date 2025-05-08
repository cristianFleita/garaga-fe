import { CairoOption, CairoOptionVariant, shortString } from "starknet";

import { useDojo } from "./useDojo";
import {
  failedTransactionToast,
  showTransactionToast,
  updateTransactionToast,
} from "../utils/transactionNotifications";

// import { useSettings } from "../providers/SettingsProvider";

const createGameEmptyResponse = {
  gameId: 0,
  hand: [],
};

// const CREATE_GAME_EVENT_KEY = getEventKey(DojoEvents.CREATE_GAME);

const MINT_GAME_EVENT_KEY =
  import.meta.env.VITE_MINT_GAME_EVENT_KEY ||
  "0x2f01dd863550300355e99ebfc08524ac0d60d424c59eda114a54140df28d8ac";

export const useGameActions = () => {
  const {
    setup: { client },
    account: { account },
  } = useDojo();

  const createGame = async () => {
    try {
      showTransactionToast();
      const response = await client.game_system.createGame(account);
      const transaction_hash = response?.transaction_hash ?? "";
      showTransactionToast(transaction_hash, "Creating game...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;
        // TODO: Get game id form the events

        // console.log(
        //   "events",
        //   events.filter((event) => event.keys[1] === CREATE_GAME_EVENT_KEY)
        // );
        // const gameId = getNumberValueFromEvents(
        //   events,
        //   CREATE_GAME_EVENT_KEY,
        //   3
        // );
        // console.log("Game " + gameId + " created");

        return {
          // gameId,
          // hand: getCardsFromEvents(events),
        };
      } else {
        console.error("Error creating game:", tx);
        return createGameEmptyResponse;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return createGameEmptyResponse;
    }
  };

  const joinGame = async (gameId: number) => {
    try {
      showTransactionToast();
      const response = await client.game_system.joinGame(account, gameId);
      const transaction_hash = response?.transaction_hash ?? "";
      showTransactionToast(transaction_hash, "Joining game...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;

        return {};
      } else {
        console.error("Error creating game:", tx);
        return createGameEmptyResponse;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return createGameEmptyResponse;
    }
  };

  // TODO:
  // - submit_wolf_commitment
  // - wolf_kill_sheep
  // - shepherd_mark_suspicious
  // - check_is_wolf

  return {
    createGame,
    joinGame,
  };
};

import { CairoOption, CairoOptionVariant, shortString } from "starknet";

import { useDojo } from "./useDojo";
import {
  failedTransactionToast,
  showTransactionToast,
  updateTransactionToast,
} from "../utils/transactionNotifications";
import { getEventKey } from "../utils/getEventKey";
import { DojoEvents } from "../enums/dojoEvents";
import { getNumberValueFromEvents } from "../utils/getNumberValueFromEvent";

const createGameEmptyResponse = {
  gameId: 0,
};

const CREATE_GAME_EVENT_KEY = getEventKey(DojoEvents.CREATE_GAME);

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

        console.log(
          "events",
          events.filter((event) => event.keys[1] === CREATE_GAME_EVENT_KEY)
        );
        const gameId = getNumberValueFromEvents(
          events,
          CREATE_GAME_EVENT_KEY,
          3
        );
        console.log("Game " + gameId + " created");

        return {
          gameId,
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

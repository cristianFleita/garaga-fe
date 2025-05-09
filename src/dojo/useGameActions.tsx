import { CairoOption, CairoOptionVariant, shortString } from "starknet";
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend, reconstructHonkProof } from "@aztec/bb.js";
import {
  bytecode as wolfByteCode,
  abi as wolfAbi,
} from "../assets/is_wolf/circuit.json";
import wolfVkUrl from "../assets/is_wolf/vk.bin?url";
import {
  bytecode as killSheepByteCode,
  abi as killSheepAbi,
} from "../assets/is_wolf/circuit.json";
import killSheepVkUrl from "../assets/is_wolf/vk.bin?url";

import { useDojo } from "./useDojo";
import {
  failedTransactionToast,
  showTransactionToast,
  updateTransactionToast,
} from "../utils/transactionNotifications";
import { getEventKey } from "../utils/getEventKey";
import { DojoEvents } from "../enums/dojoEvents";
import { getNumberValueFromEvents } from "../utils/getNumberValueFromEvent";
import {
  getHonkCallData,
  parseHonkProofFromBytes,
  parseHonkVerifyingKeyFromBytes,
} from "garaga";
import { flattenFieldsAsArray } from "./utils/proof";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import { useEffect, useState } from "react";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
import { WOLF_INDEX, WOLF_SALT } from "../constants/localStorage";

const createGameEmptyResponse = {
  gameId: 0,
};

const CREATE_GAME_EVENT_KEY = getEventKey(DojoEvents.CREATE_GAME);

export const useGameActions = () => {
  const {
    setup: { client },
    account: { account },
  } = useDojo();

  const [wolfVk, setWolfVk] = useState<Uint8Array | null>(null);
  const [killSheepvk, setKillSheepVk] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const initWasm = async () => {
      try {
        if (typeof window !== "undefined") {
          await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);
          console.log("WASM initialization in App component complete");
          // await init();
        }
      } catch (error) {
        console.error("Failed to initialize WASM in App component:", error);
      }
    };

    const loadVk = async (vkUrl: any, setVk: (res: Uint8Array) => void) => {
      const response = await fetch(vkUrl);
      const arrayBuffer = await response.arrayBuffer();
      const binaryData = new Uint8Array(arrayBuffer);
      setVk(binaryData);
      console.log("Loaded verifying key:", binaryData);
    };

    initWasm();
    loadVk(wolfVkUrl, setWolfVk);
    loadVk(killSheepVkUrl, setKillSheepVk);
  }, []);

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
        console.error("Error joining game:", tx);
        return {};
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {};
    }
  };

  const submitWolfCommitment = async (gameId: number, commitment: number) => {
    try {
      showTransactionToast();
      const response = await client.game_system.submitWolfCommitment(
        account,
        gameId,
        commitment
      );
      const transaction_hash = response?.transaction_hash ?? "";
      showTransactionToast(transaction_hash, "Submitting wolf commitment ...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;

        return {};
      } else {
        console.error("Error submitting commitment ", tx);
        return {};
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {};
    }
  };

  const wolfKillSheep = async (
    gameId: number,
    sheepToKillIndex: number,
    commitment: number,
    wolfIndex: number,
    sheep_positions: any,
    sheep_alive: boolean[]
  ) => {
    try {
      showTransactionToast();

      const inputs = {
        wolf_value: BigInt(localStorage.getItem(WOLF_INDEX) ?? 0),
        wolf_index: wolfIndex,
        wolf_salt: BigInt(localStorage.getItem(WOLF_SALT) ?? 0),
        sheep_positions: sheep_positions,
        sheep_alive: sheep_alive,
        wolf_commitment: commitment,
        sheep_to_kill_index: sheepToKillIndex,
      };

      const proof = await getProof(
        inputs,
        killSheepByteCode,
        killSheepAbi,
        killSheepvk as Uint8Array
      );

      const response = await client.game_system.wolfKillSheep(
        account,
        gameId,
        proof,
        sheepToKillIndex
      );
      const transaction_hash = response?.transaction_hash ?? "";
      showTransactionToast(transaction_hash, "Trying to kill sheep...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;

        return {};
      } else {
        console.error("Error killing sheep ", tx);
        return {};
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {};
    }
  };

  const shepherdMarkSuspicious = async (
    gameId: number,
    suspectSheepIndex: number
  ) => {
    try {
      showTransactionToast();
      const response = await client.game_system.shepherdMarkSuspicious(
        account,
        gameId,
        suspectSheepIndex
      );
      const transaction_hash = response?.transaction_hash ?? "";
      showTransactionToast(transaction_hash, "Shepherd marking sheep...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;

        return {};
      } else {
        console.error("Error marking sheep", tx);
        return {};
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {};
    }
  };

  const checkIsWolf = async (gameId: number) => {
    try {
      showTransactionToast();
      // si el value del lobo es igual a la oveja que sospecha el pastor pasas el valor 1 caso contrario 0
      // is_wolf_result
      const inputs = {};
      const callData = await getProof(
        inputs,
        wolfByteCode,
        wolfAbi,
        wolfVk as Uint8Array
      );

      const response = await client.game_system.checkIsWolf(
        account,
        gameId,
        callData
      );
      const transaction_hash = response?.transaction_hash ?? "";
      showTransactionToast(transaction_hash, "Check sheep marked is wolf...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;

        return {};
      } else {
        console.error("Error checking wolf", tx);
        return {};
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {};
    }
  };

  const getProof = async (
    inputs: any,
    bytecode: string,
    abi: any,
    vk: Uint8Array
  ) => {
    let noir = new Noir({ bytecode, abi: abi as any });

    let execResult = await noir.execute(inputs);
    console.log("NOIR");
    let honk = new UltraHonkBackend(bytecode, { threads: 2 });

    let proof = await honk.generateProof(execResult.witness, { keccak: true });
    honk.destroy();
    console.log(proof);

    const rawProof = reconstructHonkProof(
      flattenFieldsAsArray(proof.publicInputs),
      proof.proof
    );
    const honkProof = parseHonkProofFromBytes(rawProof);
    const honkVk = parseHonkVerifyingKeyFromBytes(vk as Uint8Array);

    console.log("CALL DATA BEFORE");
    const callData = getHonkCallData(
      honkProof,
      honkVk,
      0 // HonkFlavor.KECCAK
    );
    console.log("END");

    return callData;
  };
  return {
    createGame,
    joinGame,
    submitWolfCommitment,
    wolfKillSheep,
    shepherdMarkSuspicious,
    checkIsWolf,
  };
};

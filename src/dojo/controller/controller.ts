import ControllerConnector from "@cartridge/connector/controller";
import { ControllerOptions } from "@cartridge/controller";
import { constants, shortString } from "starknet";
import { policies } from "./policies";

const CHAIN =
  import.meta.env.VITE_SLOT_INSTANCE ||
  import.meta.env.VITE_CHAIN ||
  "jokers-of-neon";

const DOJO_NAMESPACE =
  import.meta.env.VITE_DOJO_NAMESPACE || "jokers_of_neon_core";

const getChainId = (chain: string) => {
  if (chain === "mainnet") {
    return constants.StarknetChainId.SN_MAIN;
  } else if (chain === "sepolia") {
    return constants.StarknetChainId.SN_SEPOLIA;
  } else {
    throw new Error(`Chain ${chain} not supported`);
  }
};

const defaultChainId =
  CHAIN === "mainnet" || CHAIN === "sepolia"
    ? getChainId(CHAIN)
    : shortString.encodeShortString(
        `WP_${CHAIN.toUpperCase().replace("-", "_")}`
      );

const isDev = import.meta.env.VITE_DEV === "true";

const RPC_URL = import.meta.env.VITE_RPC_URL || "http://localhost:5050";

const controllerOptions: ControllerOptions = {
  policies,
  chains: [{ rpcUrl: RPC_URL }],
  defaultChainId,
  namespace: DOJO_NAMESPACE,
  // preset: "jokers-of-neon",
};

if (CHAIN !== "mainnet" && CHAIN !== "sepolia") {
  controllerOptions.slot = CHAIN;
}

export const controller = !isDev && new ControllerConnector(controllerOptions);

import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum, ByteArray } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_game_system_checkIsWolf_calldata = (gameId: BigNumberish, proof: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "game_system",
			entrypoint: "check_is_wolf",
			calldata: [gameId, proof],
		};
	};

	const game_system_checkIsWolf = async (snAccount: Account | AccountInterface, gameId: BigNumberish, proof: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_system_checkIsWolf_calldata(gameId, proof),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_system_createGame_calldata = (): DojoCall => {
		return {
			contractName: "game_system",
			entrypoint: "create_game",
			calldata: [],
		};
	};

	const game_system_createGame = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_system_createGame_calldata(),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_system_joinGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "game_system",
			entrypoint: "join_game",
			calldata: [gameId],
		};
	};

	const game_system_joinGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_system_joinGame_calldata(gameId),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_system_shepherdMarkSuspicious_calldata = (gameId: BigNumberish, sheepToMarkIndex: BigNumberish): DojoCall => {
		return {
			contractName: "game_system",
			entrypoint: "shepherd_mark_suspicious",
			calldata: [gameId, sheepToMarkIndex],
		};
	};

	const game_system_shepherdMarkSuspicious = async (snAccount: Account | AccountInterface, gameId: BigNumberish, sheepToMarkIndex: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_system_shepherdMarkSuspicious_calldata(gameId, sheepToMarkIndex),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_system_submitWolfCommitment_calldata = (gameId: BigNumberish, wolfCommitment: BigNumberish): DojoCall => {
		return {
			contractName: "game_system",
			entrypoint: "submit_wolf_commitment",
			calldata: [gameId, wolfCommitment],
		};
	};

	const game_system_submitWolfCommitment = async (snAccount: Account | AccountInterface, gameId: BigNumberish, wolfCommitment: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_system_submitWolfCommitment_calldata(gameId, wolfCommitment),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_system_wolfKillSheep_calldata = (gameId: BigNumberish, proof: Array<BigNumberish>, sheepToKillIndex: BigNumberish): DojoCall => {
		return {
			contractName: "game_system",
			entrypoint: "wolf_kill_sheep",
			calldata: [gameId, proof, sheepToKillIndex],
		};
	};

	const game_system_wolfKillSheep = async (snAccount: Account | AccountInterface, gameId: BigNumberish, proof: Array<BigNumberish>, sheepToKillIndex: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_system_wolfKillSheep_calldata(gameId, proof, sheepToKillIndex),
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		game_system: {
			checkIsWolf: game_system_checkIsWolf,
			buildCheckIsWolfCalldata: build_game_system_checkIsWolf_calldata,
			createGame: game_system_createGame,
			buildCreateGameCalldata: build_game_system_createGame_calldata,
			joinGame: game_system_joinGame,
			buildJoinGameCalldata: build_game_system_joinGame_calldata,
			shepherdMarkSuspicious: game_system_shepherdMarkSuspicious,
			buildShepherdMarkSuspiciousCalldata: build_game_system_shepherdMarkSuspicious_calldata,
			submitWolfCommitment: game_system_submitWolfCommitment,
			buildSubmitWolfCommitmentCalldata: build_game_system_submitWolfCommitment_calldata,
			wolfKillSheep: game_system_wolfKillSheep,
			buildWolfKillSheepCalldata: build_game_system_wolfKillSheep_calldata,
		},
	};
}
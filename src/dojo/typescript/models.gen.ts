import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoCustomEnum, BigNumberish } from 'starknet';

// Type definition for `dojo_starter::models::Cell` struct
export interface Cell {
	game_id: BigNumberish;
	idx: BigNumberish;
	value: BigNumberish;
	is_alive: boolean;
}

// Type definition for `dojo_starter::models::CellValue` struct
export interface CellValue {
	value: BigNumberish;
	is_alive: boolean;
}

// Type definition for `dojo_starter::models::Game` struct
export interface Game {
	id: BigNumberish;
	round_count: BigNumberish;
	state: GameStateEnum;
	player_1: string;
	player_2: string;
	shepherd: string;
	wolf: string;
	player_1_score: BigNumberish;
	player_2_score: BigNumberish;
	winner: string;
}

// Type definition for `dojo_starter::models::GameValue` struct
export interface GameValue {
	round_count: BigNumberish;
	state: GameStateEnum;
	player_1: string;
	player_2: string;
	shepherd: string;
	wolf: string;
	player_1_score: BigNumberish;
	player_2_score: BigNumberish;
	winner: string;
}

// Type definition for `dojo_starter::models::Round` struct
export interface Round {
	game_id: BigNumberish;
	wolf_commitment: BigNumberish;
	surviving_sheep: BigNumberish;
	state: RoundStateEnum;
	suspicious_sheep_index: BigNumberish;
	current_turn: string;
}

// Type definition for `dojo_starter::models::RoundValue` struct
export interface RoundValue {
	wolf_commitment: BigNumberish;
	surviving_sheep: BigNumberish;
	state: RoundStateEnum;
	suspicious_sheep_index: BigNumberish;
	current_turn: string;
}

// Type definition for `dojo_starter::models::CreateGameEvent` struct
export interface CreateGameEvent {
	player: string;
	game_id: BigNumberish;
}

// Type definition for `dojo_starter::models::CreateGameEventValue` struct
export interface CreateGameEventValue {
	game_id: BigNumberish;
}

// Type definition for `dojo_starter::models::GameState` enum
export type GameState = {
	WaitingForPlayer2: string;
	NotStarted: string;
	InProgress: string;
	Finished: string;
}
export type GameStateEnum = CairoCustomEnum;

// Type definition for `dojo_starter::models::RoundState` enum
export type RoundState = {
	WaitingForWolfCommitment: string;
	WaitingForSheepToKill: string;
	WaitingForWolfSelection: string;
	WaitingForWolfResult: string;
}
export type RoundStateEnum = CairoCustomEnum;

export interface SchemaType extends ISchemaType {
	dojo_starter: {
		Cell: Cell,
		CellValue: CellValue,
		Game: Game,
		GameValue: GameValue,
		Round: Round,
		RoundValue: RoundValue,
		CreateGameEvent: CreateGameEvent,
		CreateGameEventValue: CreateGameEventValue,
	},
}
export const schema: SchemaType = {
	dojo_starter: {
		Cell: {
			game_id: 0,
			idx: 0,
			value: 0,
			is_alive: false,
		},
		CellValue: {
			value: 0,
			is_alive: false,
		},
		Game: {
			id: 0,
			round_count: 0,
		state: new CairoCustomEnum({ 
					WaitingForPlayer2: "",
				NotStarted: undefined,
				InProgress: undefined,
				Finished: undefined, }),
			player_1: "",
			player_2: "",
			shepherd: "",
			wolf: "",
			player_1_score: 0,
			player_2_score: 0,
			winner: "",
		},
		GameValue: {
			round_count: 0,
		state: new CairoCustomEnum({ 
					WaitingForPlayer2: "",
				NotStarted: undefined,
				InProgress: undefined,
				Finished: undefined, }),
			player_1: "",
			player_2: "",
			shepherd: "",
			wolf: "",
			player_1_score: 0,
			player_2_score: 0,
			winner: "",
		},
		Round: {
			game_id: 0,
		wolf_commitment: 0,
			surviving_sheep: 0,
		state: new CairoCustomEnum({ 
					WaitingForWolfCommitment: "",
				WaitingForSheepToKill: undefined,
				WaitingForWolfSelection: undefined,
				WaitingForWolfResult: undefined, }),
			suspicious_sheep_index: 0,
			current_turn: "",
		},
		RoundValue: {
		wolf_commitment: 0,
			surviving_sheep: 0,
		state: new CairoCustomEnum({ 
					WaitingForWolfCommitment: "",
				WaitingForSheepToKill: undefined,
				WaitingForWolfSelection: undefined,
				WaitingForWolfResult: undefined, }),
			suspicious_sheep_index: 0,
			current_turn: "",
		},
		CreateGameEvent: {
			player: "",
			game_id: 0,
		},
		CreateGameEventValue: {
			game_id: 0,
		},
	},
};
export enum ModelsMapping {
	Cell = 'dojo_starter-Cell',
	CellValue = 'dojo_starter-CellValue',
	Game = 'dojo_starter-Game',
	GameState = 'dojo_starter-GameState',
	GameValue = 'dojo_starter-GameValue',
	Round = 'dojo_starter-Round',
	RoundState = 'dojo_starter-RoundState',
	RoundValue = 'dojo_starter-RoundValue',
	CreateGameEvent = 'dojo_starter-CreateGameEvent',
	CreateGameEventValue = 'dojo_starter-CreateGameEventValue',
}
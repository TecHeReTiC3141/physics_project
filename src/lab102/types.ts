import { GameObject } from "../types.ts";

export enum GameObjectId {
    'GATE_LEFT' = 'GATE_LEFT',
    'GATE_RIGHT' = 'GATE_RIGHT',
    'RAIL' = 'RAIL',
    'CART' = 'CART',
    'TABLO' = 'TABLO',
    'PUMP' = 'PUMP',
    'ADD_BOARD' = 'ADD_BOARD',
    'REMOVE_BOARD' = 'REMOVE_BOARD',
    'BOARDS' = 'BOARDS',
    'GROUND' = 'GROUND',
    'RESET_BUTTON' = 'RESET_BUTTON',
    'START_BUTTON' = 'START_BUTTON',
}

export type Lab102GameObject = GameObject<GameObjectId>

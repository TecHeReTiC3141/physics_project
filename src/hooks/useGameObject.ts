import { GameObject, GameObjectId } from "../objects/types.ts";
import { CANVAS_WIDTH, RAIL_WIDTH, RAIL_X_LEFT } from "../objects/constants.ts";
import { Dispatch, SetStateAction } from "react";

type Props = {
    setBoardsCount: Dispatch<SetStateAction<number>>
    setIsPumpTurnedOn: Dispatch<SetStateAction<boolean>>
}

export const useGameObjectsData = ({ setBoardsCount, setIsPumpTurnedOn }: Props): GameObject[] => {
    const data =
        [
            { id: GameObjectId.TABLO, x: 600, y: 70, width: 300, height: 360, color: 'blue', isStatic: true },
            { id: GameObjectId.START_BUTTON, x: 840, y: 90, width: 45, height: 32, color: 'blue', isStatic: true },
            { id: GameObjectId.RESET_BUTTON, x: 840, y: 140, width: 45, height: 30, color: 'blue', isStatic: true },
            { id: GameObjectId.TABLO, x: 600, y: 70, width: 300, height: 360, color: 'blue', isStatic: true },
            { id: GameObjectId.GROUND, x: 0, y: 400, width: CANVAS_WIDTH, height: 25, color: 'blue', isStatic: true },
            {
                id: GameObjectId.RAIL,
                x: RAIL_X_LEFT,
                y: 280,
                width: RAIL_WIDTH,
                height: 120,
                color: 'black',
                isStatic: true,
                affectedByRotation: true
            },
            {
                id: GameObjectId.GATE_LEFT,
                x: 250,
                y: 250,
                width: 15,
                height: 75,
                color: 'blue',
                onlyX: true,
                affectedByRotation: true
            },
            {
                id: GameObjectId.GATE_RIGHT,
                x: 750,
                y: 250,
                width: 15,
                height: 75,
                color: 'red',
                onlyX: true,
                affectedByRotation: true
            },
            {
                id: GameObjectId.CART,
                x: RAIL_X_LEFT,
                y: 270,
                width: 60,
                height: 30,
                color: 'gray',
                onlyX: true,
                isStatic: false,
                affectedByRotation: true
            },
            {
                id: GameObjectId.PUMP, x: 35, y: 320, width: 120, height: 60, color: 'green', isStatic: true,
                onClick() {
                    setIsPumpTurnedOn((prev) => !prev)
                },
            },
            {
                id: GameObjectId.REMOVE_BOARD, x: 360, y: 380, width: 20, height: 20, color: 'black', isStatic: true,
                onClick() {
                    setBoardsCount((prev) => Math.max(0, prev - 1))
                },
            },
            {
                id: GameObjectId.ADD_BOARD, x: 440, y: 380, width: 20, height: 20, color: 'black', isStatic: true,
                onClick() {
                    setBoardsCount((prev) => Math.min(5, prev + 1))
                },
            },
            {
                id: GameObjectId.BOARDS, x: 465, y: 450, width: 50, height: 5, color: 'black', isStatic: true,
            },
        ]

    return data
}
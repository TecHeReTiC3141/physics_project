import { GameObject, GameObjectId } from "../objectsHooks/types.ts";
import { Dispatch, SetStateAction } from "react";
import { CANVAS_WIDTH, RAIL_WIDTH, RAIL_X_LEFT, RAIL_X_LEFT_OFFSET } from "../constants";
import tableau from "../assets/tableau.png";

type Props = {
    setBoardsCount: Dispatch<SetStateAction<number>>
    setIsPumpTurnedOn: Dispatch<SetStateAction<boolean>>
    setIsMagnetReleased: Dispatch<SetStateAction<boolean>>
    setLeftTime: Dispatch<SetStateAction<number | null>>
    setRightTime: Dispatch<SetStateAction<number | null>>
}

export const useGameObjectsData = ({ setBoardsCount, setIsPumpTurnedOn, setIsMagnetReleased, setLeftTime, setRightTime }: Props): GameObject[] => {


    const data: GameObject[] =
        [
            { id: GameObjectId.TABLO, x: 880, y: 43, width: 300, height: 360, color: 'blue', isStatic: true, },
            {
                id: GameObjectId.START_BUTTON, x: 1117, y: 60, width: 45, height: 32, color: 'blue', isStatic: true,
                onClick() {
                    setIsMagnetReleased(true)
                }
            },
            {
                id: GameObjectId.RESET_BUTTON,
                x: 1117,
                y: 107,
                width: 45,
                height: 30,
                color: 'blue',
                isStatic: true,
                onClick() {
                    setIsMagnetReleased(false)
                    setLeftTime(null)
                    setRightTime(null)
                }
            },
            { id: GameObjectId.GROUND, x: 0, y: 400, width: CANVAS_WIDTH, height: 25, color: 'blue', isStatic: true },
            {
                id: GameObjectId.RAIL,
                x: RAIL_X_LEFT,
                y: 282,
                width: RAIL_WIDTH,
                height: 120,
                color: 'black',
                isStatic: true,
                affectedByRotation: true
            },
            {
                id: GameObjectId.GATE_LEFT,
                x: 300,
                y: 237,
                width: 15,
                height: 100,
                color: 'blue',
                onlyX: true,
                affectedByRotation: true
            },
            {
                id: GameObjectId.GATE_RIGHT,
                x: 600,
                y: 237,
                width: 15,
                height: 100,
                color: 'red',
                onlyX: true,
                affectedByRotation: true
            },
            {
                id: GameObjectId.CART,
                x: RAIL_X_LEFT + RAIL_X_LEFT_OFFSET,
                y: 270,
                width: 95,
                height: 45,
                color: 'gray',
                onlyX: true,
                isStatic: false,
                affectedByRotation: true
            },
            {
                id: GameObjectId.PUMP, x: 35, y: 343, width: 120, height: 60, color: 'green', isStatic: true,
                onClick() {
                    setIsPumpTurnedOn((prev) => !prev)
                },
            },
            {
                id: GameObjectId.REMOVE_BOARD, x: 370, y: 380, width: 20, height: 20, color: 'black', isStatic: true,
                onClick() {
                    setBoardsCount((prev) => Math.max(0, prev - 1))
                },
            },
            {
                id: GameObjectId.ADD_BOARD, x: 460, y: 380, width: 20, height: 20, color: 'black', isStatic: true,
                onClick() {
                    setBoardsCount((prev) => Math.min(5, prev + 1))
                },
            },
            {
                id: GameObjectId.BOARDS, x: 427, y: 395, width: 50, height: 5, color: 'black', isStatic: true,
            },
        ]

    return data
}
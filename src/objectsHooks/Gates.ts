import { GameObjectId } from "./types.ts";
import { TableNumber, useGameObjects, useTableData } from "../context";
import { useEffect, useRef } from "react";
import { RAIL_X_LEFT, RAIL_X_LEFT_OFFSET, RAIL_X_RIGHT, RAIL_X_RIGHT_OFFSET } from "../constants.ts";
import { calculateThirdTableDto } from "../utils/logic/thirdTable.ts";

const TIME_COOLDOWN = 500

const TOTAL_LENGTH = 1.3
const HALF_CART_WIDTH = 48
const MEASURE_LENGTH = RAIL_X_RIGHT - RAIL_X_LEFT - RAIL_X_LEFT_OFFSET - RAIL_X_RIGHT_OFFSET - HALF_CART_WIDTH

const calculateGatePosition = (x: number) => {
    return (x - RAIL_X_LEFT - RAIL_X_LEFT_OFFSET - HALF_CART_WIDTH) / MEASURE_LENGTH * TOTAL_LENGTH
}

export const useGates = () => {
    const {
        draggedObjectId,
        bufferedGameObjects,
        getGameObject,
        updateGameObject,
        isPumpTurnedOn,
        isMagnetReleased,
        setLeftTime,
        setRightTime,
        boardsCount
    } = useGameObjects()
    const { appendThirdTableEntry, selectedTable } = useTableData()

    const lastPass = useRef(Date.now())

    useEffect(() => {
        const left = getGameObject(GameObjectId.GATE_LEFT)
        const right = getGameObject(GameObjectId.GATE_RIGHT)
        const cart = getGameObject(GameObjectId.CART)
        if (draggedObjectId === GameObjectId.GATE_LEFT) {
            if (left.x < RAIL_X_LEFT) {
                updateGameObject(GameObjectId.GATE_LEFT, { x: RAIL_X_LEFT })
            }
            if (left.x + left.width > right.x) {
                updateGameObject(GameObjectId.GATE_LEFT, { x: right.x - left.width })
            }
        } else if (draggedObjectId === GameObjectId.GATE_RIGHT) {
            if (right.x + right.width > RAIL_X_RIGHT) {
                updateGameObject(GameObjectId.GATE_RIGHT, { x: RAIL_X_RIGHT - right.width })
            }
            if (right.x < left.x + left.width) {
                updateGameObject(GameObjectId.GATE_RIGHT, { x: left.x + left.width })
            }
        }
        const RANGE = 2
        if (cart.x + cart.width / 2 >= left.x - RANGE && cart.x + cart.width / 2 <= left.x + RANGE) {
            console.log("PASSED LEFT")
            setLeftTime(11.03)
        } else if (isPumpTurnedOn && (isMagnetReleased || cart.x > RAIL_X_LEFT + RAIL_X_LEFT_OFFSET) &&
            cart.x + cart.width / 2 >= right.x - RANGE && cart.x + cart.width / 2 <= right.x + RANGE) {
            console.log("PASSED RIGHT")
            const currentStamp = Date.now()
            if (selectedTable === TableNumber.THIRD && currentStamp - lastPass.current >= TIME_COOLDOWN) {
                const leftPosition = calculateGatePosition(left.x + left.width / 2)
                const rightPosition = calculateGatePosition(right.x + right.width / 2)
                console.log("LEFT", leftPosition, "RIGHT", rightPosition)
                appendThirdTableEntry( calculateThirdTableDto(leftPosition, rightPosition))
                lastPass.current = currentStamp
            }
            setRightTime(13.09)
        }
    }, [ draggedObjectId, bufferedGameObjects, setLeftTime, setRightTime, getGameObject, updateGameObject, isPumpTurnedOn, isMagnetReleased, selectedTable, appendThirdTableEntry, boardsCount ]);
}
import { GameObjectId } from "../types.ts";
import { TableNumber, useGameObjects, useTableData } from "../context";
import { useEffect, useRef } from "react";
import { RAIL_X_LEFT, RAIL_X_LEFT_OFFSET, RAIL_X_RIGHT, RAIL_X_RIGHT_OFFSET } from "../constants.ts";
import { calculateThirdTableDto, calculateFourthTableDto } from "../utils/logic";

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
    const { appendThirdTableEntry, selectedTable, appendFourthTableEntry } = useTableData()

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
        if (isPumpTurnedOn && (isMagnetReleased || cart.x > RAIL_X_LEFT + RAIL_X_LEFT_OFFSET) &&
            cart.x + cart.width / 2 >= right.x - RANGE && cart.x + cart.width / 2 <= right.x + RANGE) {
            console.log("PASSED RIGHT")
            const currentStamp = Date.now()
            let t1 = null, t2 = null
            if (currentStamp - lastPass.current >= TIME_COOLDOWN) {
                if (selectedTable === TableNumber.THIRD) {
                    const leftPosition = calculateGatePosition(left.x + left.width / 2)
                    const rightPosition = calculateGatePosition(right.x + right.width / 2)
                    const thirdTableDto =  calculateThirdTableDto(leftPosition, rightPosition)
                    ;({ t1, t2 } = thirdTableDto)
                    appendThirdTableEntry(thirdTableDto)
                    lastPass.current = currentStamp
                    setLeftTime(t1)
                    setRightTime(t2)
                } else if (selectedTable === TableNumber.FOURTH) {
                    const fourthTableDto =  calculateFourthTableDto(boardsCount)
                    ;({ t1, t2 } = fourthTableDto)
                    appendFourthTableEntry(fourthTableDto)
                    lastPass.current = currentStamp
                    setLeftTime(t1)
                    setRightTime(t2)
                }
            }

        }
    }, [draggedObjectId, bufferedGameObjects, setLeftTime, setRightTime, getGameObject, updateGameObject, isPumpTurnedOn, isMagnetReleased, selectedTable, appendThirdTableEntry, boardsCount, appendFourthTableEntry]);
}
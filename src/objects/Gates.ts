import { GameObjectId } from "./types.ts";
import { useGameObjects } from "../context";
import { useEffect } from "react";
import { RAIL_X_RIGHT, RAIL_X_LEFT } from "./constants.ts";

export const useGates = () => {
    const { draggedObjectId, bufferedGameObjects, getGameObject, updateGameObject } = useGameObjects()

    useEffect(() => {
        const left = getGameObject(GameObjectId.GATE_LEFT)
        const right = getGameObject(GameObjectId.GATE_RIGHT)
        const cart = getGameObject(GameObjectId.CART)
        console.log(bufferedGameObjects)
        console.log("left", left)
        console.log("right", right)
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
        if (cart.x + cart.width / 2 === left.x) {
            console.log("PASSED LEFT")
        } else if (cart.x + cart.width / 2 === right.x) {
            console.log("PASSED RIGHT")
        }
    }, [draggedObjectId, bufferedGameObjects, getGameObject, updateGameObject]);
}
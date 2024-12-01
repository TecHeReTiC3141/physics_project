import { GameObjectId } from "./types.ts";
import { useGameObjects } from "../context";
import { useEffect } from "react";

const MAX_RIGHT = 1000
const MIN_LEFT = 100
export const useGates = () => {
    const { draggedObjectId, gameObjects, getGameObject, updateGameObject } = useGameObjects()

    useEffect(() => {
        const left = getGameObject(GameObjectId.GATE_LEFT)
        const right = getGameObject(GameObjectId.GATE_RIGHT)
        console.log(left, right, draggedObjectId)
        if (draggedObjectId === GameObjectId.GATE_LEFT) {
            if (left.x < MIN_LEFT) {
                updateGameObject(GameObjectId.GATE_LEFT, { x: MIN_LEFT })
            }
            if (left.x + left.width > right.x) {
                updateGameObject(GameObjectId.GATE_LEFT, { x: right.x - left.width })
            }
        } else if (draggedObjectId === GameObjectId.GATE_RIGHT) {
            if (right.x + right.width > MAX_RIGHT) {
                updateGameObject(GameObjectId.GATE_RIGHT, { x: MAX_RIGHT - right.width })
            }
            if (right.x < left.x + left.width) {
                updateGameObject(GameObjectId.GATE_RIGHT, { x: left.x + left.width })
            }
        }
    }, [draggedObjectId, gameObjects, getGameObject, updateGameObject]);
}
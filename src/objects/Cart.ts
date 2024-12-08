import { useGameObjects } from "../context";
import { useEffect } from "react";
import { GameObjectId } from "./types.ts";
import {RAIL_X_LEFT, RAIL_X_RIGHT, RAIL_X_RIGHT_OFFSET} from "../constants.ts";

export const useCart = () => {
    const { draggedObjectId, getGameObject, updateGameObject, isPumpTurnedOn, gameObjects } = useGameObjects()
    useEffect(() => {
        const cart = getGameObject(GameObjectId.CART)
        // if (draggedObjectId === GameObjectId.CART) {
            if (cart.x < RAIL_X_LEFT) {
                updateGameObject(GameObjectId.CART, { x: RAIL_X_LEFT })
            }
            if (cart.x + cart.width > RAIL_X_RIGHT - RAIL_X_RIGHT_OFFSET) {
                updateGameObject(GameObjectId.CART, { x: RAIL_X_RIGHT - RAIL_X_RIGHT_OFFSET - cart.width })
            }
        // }
        if (isPumpTurnedOn !== cart.isStatic) {
            updateGameObject(GameObjectId.CART, { isStatic: isPumpTurnedOn })
        }
    }, [draggedObjectId, gameObjects, getGameObject, updateGameObject, isPumpTurnedOn]);
}
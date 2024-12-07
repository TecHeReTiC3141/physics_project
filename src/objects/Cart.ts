import { useGameObjects } from "../context";
import { useEffect } from "react";
import { GameObjectId } from "./types.ts";
import { RAIL_X_LEFT, RAIL_X_RIGHT } from "./constants.ts";

export const useCart = () => {
    const { draggedObjectId, getGameObject, updateGameObject, isPumpTurnedOn } = useGameObjects()
    useEffect(() => {
        const cart = getGameObject(GameObjectId.CART)
        if (draggedObjectId === GameObjectId.CART) {
            if (cart.x < RAIL_X_LEFT) {
                updateGameObject(GameObjectId.CART, { x: RAIL_X_LEFT })
            }
            if (cart.x + cart.width > RAIL_X_RIGHT) {
                updateGameObject(GameObjectId.CART, { x: RAIL_X_RIGHT - cart.width })
            }
        }
        // if (isPumpTurnedOn && cart.x < RAIL_X_RIGHT - cart.width) {
        //     updateGameObject(GameObjectId.CART, { x: cart.x + 1 })
        // }
        if (isPumpTurnedOn !== cart.isStatic) {
            updateGameObject(GameObjectId.CART, { isStatic: isPumpTurnedOn })
        }
    }, [draggedObjectId, getGameObject, updateGameObject, isPumpTurnedOn]);
}
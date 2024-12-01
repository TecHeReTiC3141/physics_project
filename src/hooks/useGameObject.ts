import { GameObjectId } from "../objects/types.ts";
import { useGameObjects } from "../context";

export const useGameObject = (id: GameObjectId) => {
    const { gameObjects } = useGameObjects()

    return gameObjects.find(obj => obj.id === id)
}
import { GameObject, GameObjectId } from "../objects/types.ts";
import { createContext, useCallback, useContext, useState } from "react";

type ContextValue = {
    gameObjects: GameObject[]
    setGameObjects: React.Dispatch<React.SetStateAction<GameObject[]>>
    updateGameObject: (id: GameObjectId, data: Partial<GameObject>) => void
    getGameObject: (id: GameObjectId) => GameObject
    isDragging: boolean
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
    draggedObjectId: GameObjectId | null
    setDraggedObjectId: React.Dispatch<React.SetStateAction<GameObjectId | null>>
    offset: { x: number, y: number }
    setOffset: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
}

const GameObjectsContext = createContext<ContextValue | null>(null)

export const useGameObjects = (): ContextValue => {
    const context = useContext(GameObjectsContext);
    if (!context) {
        throw new Error('useGameObject must be used within a GameObjectProvider')
    }
    return context;
}
export const GameObjectsProvider: React.FC = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedObjectId, setDraggedObjectId] = useState<GameObjectId>(null);
    const [gameObjects, setGameObjects] = useState<GameObject[]>([
        { id: GameObjectId.RAIL, x: 100, y: 600, width: 900, height: 100, color: 'black', isStatic: true },
        { id: GameObjectId.GATE_LEFT, x: 200, y: 550, width: 15, height: 50, color: 'blue', onlyX: true },
        { id: GameObjectId.GATE_RIGHT, x: 700, y: 550, width: 15, height: 50, color: 'red', onlyX: true },
    ]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const getGameObject = useCallback((id: GameObjectId) => gameObjects.find(object => object.id === id), [gameObjects])

    const updateGameObject = useCallback((id: GameObjectId, data: Partial<GameObject>) => {
        setGameObjects(gameObjects.map(obj => obj.id === id ? { ...obj, ...data } : obj))
    }, [gameObjects])

    const value = {
        isDragging,
        setIsDragging,
        draggedObjectId,
        setDraggedObjectId,
        gameObjects,
        setGameObjects,
        offset,
        setOffset,
        getGameObject,
        updateGameObject
    }

    return (
        <GameObjectsContext.Provider value={value}>
            {children}
        </GameObjectsContext.Provider>
    )
}
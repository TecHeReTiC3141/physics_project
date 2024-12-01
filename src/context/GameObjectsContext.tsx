import { GameObject, GameObjectId } from "../objects/types.ts";
import { createContext, useContext, useState } from "react";

type ContextValue = {
    gameObjects: GameObject[]
    setGameObjects: React.Dispatch<React.SetStateAction<GameObject[]>>
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
        { id: GameObjectId.GATE_LEFT, x: 50, y: 50, width: 50, height: 50, color: 'blue' },
        { id: GameObjectId.GATE_RIGHT, x: 150, y: 100, width: 50, height: 50, color: 'red' },
    ]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const value = {
        isDragging,
        setIsDragging,
        draggedObjectId,
        setDraggedObjectId,
        gameObjects,
        setGameObjects,
        offset,
        setOffset,
    }

    return (
        <GameObjectsContext.Provider value={value}>
            {children}
        </GameObjectsContext.Provider>
    )
}
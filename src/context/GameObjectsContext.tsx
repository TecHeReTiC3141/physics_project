import { GameObject, GameObjectId } from "../objects/types.ts";
import { createContext, useCallback, useContext, useState, Dispatch, SetStateAction } from "react";

type ContextValue = {
    gameObjects: GameObject[]
    updateGameObject: (id: GameObjectId, data: Partial<GameObject>) => void
    getGameObject: (id: GameObjectId) => GameObject
    isDragging: boolean
    setIsDragging: Dispatch<SetStateAction<boolean>>
    draggedObjectId: GameObjectId | null
    setDraggedObjectId: Dispatch<SetStateAction<GameObjectId | null>>
    offset: { x: number, y: number }
    setOffset: Dispatch<SetStateAction<{ x: number, y: number }>>
    isPumpTurnedOn: boolean
    setIsPumpTurnedOn: Dispatch<SetStateAction<boolean>>
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
    const [ isPumpTurnedOn, setIsPumpTurnedOn ] = useState(false);

    const [gameObjects, setGameObjects] = useState<GameObject[]>([
        { id: GameObjectId.RAIL, x: 150, y: 600, width: 900, height: 60, color: 'black', isStatic: true,
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
            for (let i = 1; i < 3; ++i) {
                ctx.fillRect(this.x + this.width / 3 * i, this.y + this.height, 30, 100)
            }for (let i = 1; i < 10; ++i) {
                ctx.fillStyle = 'white'
                ctx.font = '12px Arial'
                ctx.fillRect(this.x + this.width / 10 * i, this.y, 10, 10)
                ctx.fillText(i.toString(), this.x + this.width / 10 * i, this.y + 30)
            }
        }},
        { id: GameObjectId.GATE_LEFT, x: 250, y: 550, width: 15, height: 50, color: 'blue', onlyX: true },
        { id: GameObjectId.GATE_RIGHT, x: 750, y: 550, width: 15, height: 50, color: 'red', onlyX: true },
        { id: GameObjectId.CART, x: 200, y: 570, width: 60, height: 30, color: 'gray', onlyX: true, isStatic: false },
        { id: GameObjectId.PUMP, x: 630, y: 700, width: 80, height: 60, color: 'green', isStatic: true,
            onClick() {
                setIsPumpTurnedOn((prev) => !prev)
            },
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.fillStyle = 'black'
                ctx.font = '12px Arial'
                ctx.fillText('PUMP\n' + (isPumpTurnedOn ? 'ON' : 'OFF'), this.x + 10, this.y + 30)
            }
        },
        { id: GameObjectId.TABLO, x: 750, y: 300, width: 300, height: 100, color: 'blue', isStatic: true,
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.fillStyle = 'black'
                ctx.font = '12px Arial'
                ctx.fillText('PUMP\n' + (isPumpTurnedOn ? 'ON' : 'OFF'), this.x + 10, this.y + 30)
            }
        }
    ]);

    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const getGameObject = useCallback((id: GameObjectId) => gameObjects.find(object => object.id === id), [gameObjects])

    const updateGameObject = useCallback((id: GameObjectId, data: Partial<GameObject>) => {
        setGameObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...data } : obj))
    }, [])

    const value = {
        isDragging,
        setIsDragging,
        draggedObjectId,
        setDraggedObjectId,
        gameObjects,
        offset,
        setOffset,
        getGameObject,
        updateGameObject,
        isPumpTurnedOn,
        setIsPumpTurnedOn
    }

    return (
        <GameObjectsContext.Provider value={value}>
            {children}
        </GameObjectsContext.Provider>
    )
}
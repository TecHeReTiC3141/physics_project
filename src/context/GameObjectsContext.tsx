import { GameObject, GameObjectId } from "../objects/types.ts";
import { createContext, useCallback, useContext, useState, Dispatch, SetStateAction, FC } from "react";
import { RAIL_WIDTH, RAIL_X_LEFT } from "../objects/constants.ts";

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
    boardsCount: number
    setBoardsCount: Dispatch<SetStateAction<number>>
}

const GameObjectsContext = createContext<ContextValue | null>(null)

export const useGameObjects = (): ContextValue => {
    const context = useContext(GameObjectsContext);
    if (!context) {
        throw new Error('useGameObject must be used within a GameObjectProvider')
    }
    return context;
}
export const GameObjectsProvider: FC = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedObjectId, setDraggedObjectId] = useState<GameObjectId>(null);
    const [ isPumpTurnedOn, setIsPumpTurnedOn ] = useState(false);
    const [ boardsCount, setBoardsCount ] = useState(0);

    const [gameObjects, setGameObjects] = useState<GameObject[]>([
        { id: GameObjectId.RAIL, x: RAIL_X_LEFT, y: 600, width: RAIL_WIDTH, height: 60, color: 'black', isStatic: true, affectedByRotation: true,
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
        { id: GameObjectId.GATE_LEFT, x: 250, y: 550, width: 15, height: 50, color: 'blue', onlyX: true, affectedByRotation: true },
        { id: GameObjectId.GATE_RIGHT, x: 750, y: 550, width: 15, height: 50, color: 'red', onlyX: true, affectedByRotation: true },
        { id: GameObjectId.CART, x: RAIL_X_LEFT, y: 570, width: 60, height: 30, color: 'gray', onlyX: true, isStatic: false, affectedByRotation: true },
        { id: GameObjectId.PUMP, x: 30, y: 700, width: 80, height: 60, color: 'green', isStatic: true,
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
        { id: GameObjectId.REMOVE_BOARD, x: 400, y: 720, width: 30, height: 30, color: 'black', isStatic: true,
            onClick() {
                setBoardsCount((prev) => Math.max(0, prev - 1))
            },
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(this.x + 30 , this.y)
                ctx.lineTo(this.x + 15, this.y + 20)
                ctx.closePath()
                ctx.fill()
            }
        },
        { id: GameObjectId.ADD_BOARD, x: 500, y: 720, width: 30, height: 30, color: 'black', isStatic: true,
            onClick() {
                setBoardsCount((prev) => Math.min(5, prev + 1))
            },
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + 20)
                ctx.lineTo(this.x + 30 , this.y + 20)
                ctx.lineTo(this.x + 15, this.y)
                ctx.closePath()
                ctx.fill()
            }
        },
        { id: GameObjectId.BOARDS, x: 465, y: 750, width: 50, height: 5, color: 'black', isStatic: true,
            draw(ctx) {
                ctx.fillStyle = this.color;
                for (let i = 0; i < boardsCount; ++i) {
                    ctx.fillRect(this.x - this.width / 2, this.y - i * (this.height + 2), this.width, this.height)
                }
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

    const value: ContextValue = {
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
        setIsPumpTurnedOn,
        boardsCount,
        setBoardsCount
    }

    return (
        <GameObjectsContext.Provider value={value}>
            {children}
        </GameObjectsContext.Provider>
    )
}
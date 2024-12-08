import { GameObject, GameObjectId } from "../objects/types.ts";
import {
    createContext,
    useCallback,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    FC,
    useEffect,
    useMemo
} from "react";
import { CANVAS_WIDTH, RAIL_WIDTH, RAIL_X_LEFT } from "../objects/constants.ts";
import rel from '../assets/rel.png'
import opticalGate from '../assets/optical_door.png'
import pumpOn from '../assets/pump_on.png'
import pumpOff from '../assets/pump_off.png'
import surface from '../assets/surface.png'
import tableau from '../assets/tableau.png'
import trolley from '../assets/trolley.png'

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
    sprites: Record<GameObjectId, (HTMLImageElement | null)>
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
    const [ sprites, setSprites ] = useState<Record<GameObjectId, (HTMLImageElement | null)>>({} as Record<GameObjectId, (HTMLImageElement | null)>);

    const [ isDragging, setIsDragging ] = useState(false);
    const [ draggedObjectId, setDraggedObjectId ] = useState<GameObjectId>(null);
    const [ isPumpTurnedOn, setIsPumpTurnedOn ] = useState(false);
    const [ boardsCount, setBoardsCount ] = useState(0);

    const data = useMemo(() => (
        [
            {
                id: GameObjectId.RAIL,
                src: rel
            },
            {
                id: GameObjectId.CART,
                src: trolley
            },
            {
                id: GameObjectId.GATE_LEFT,
                src: opticalGate
            },
            {
                id: GameObjectId.GATE_RIGHT,
                src: opticalGate
            },
            {
                id: GameObjectId.TABLO,
                src: tableau
            },
            {
                id: GameObjectId.PUMP,
                src: isPumpTurnedOn ? pumpOn : pumpOff
            },
            {
                id: GameObjectId.GROUND,
                src: surface
            },
        ]
    ), [isPumpTurnedOn])

    useEffect(() => {
        data.forEach(({ id, src }) => {
            const img = new Image();
            img.src = src;
            img.onload = () => setSprites(prev => ({ ...prev, [ id ]: img }));
        })
        console.log(data)
    }, [data]);

    const [ gameObjects, setGameObjects ] = useState<GameObject[]>([
        { id: GameObjectId.TABLO, x: 600, y: 70, width: 300, height: 360, color: 'blue', isStatic: true },
        { id: GameObjectId.GROUND, x: 0, y: 400, width: CANVAS_WIDTH, height: 25, color: 'blue', isStatic: true },
        {
            id: GameObjectId.RAIL,
            x: RAIL_X_LEFT,
            y: 280,
            width: RAIL_WIDTH,
            height: 120,
            color: 'black',
            isStatic: true,
            affectedByRotation: true
        },
        {
            id: GameObjectId.GATE_LEFT,
            x: 250,
            y: 250,
            width: 15,
            height: 75,
            color: 'blue',
            onlyX: true,
            affectedByRotation: true
        },
        {
            id: GameObjectId.GATE_RIGHT,
            x: 750,
            y: 250,
            width: 15,
            height: 75,
            color: 'red',
            onlyX: true,
            affectedByRotation: true
        },
        {
            id: GameObjectId.CART,
            x: RAIL_X_LEFT,
            y: 270,
            width: 60,
            height: 30,
            color: 'gray',
            onlyX: true,
            isStatic: false,
            affectedByRotation: true
        },
        {
            id: GameObjectId.PUMP, x: 35, y: 320, width: 120, height: 60, color: 'green', isStatic: true,
            onClick() {
                setIsPumpTurnedOn((prev) => !prev)
            },
        },
        {
            id: GameObjectId.REMOVE_BOARD, x: 400, y: 420, width: 30, height: 30, color: 'black', isStatic: true,
            onClick() {
                setBoardsCount((prev) => Math.max(0, prev - 1))
            },
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(this.x + 30, this.y)
                ctx.lineTo(this.x + 15, this.y + 20)
                ctx.closePath()
                ctx.fill()
            }
        },
        {
            id: GameObjectId.ADD_BOARD, x: 500, y: 420, width: 30, height: 30, color: 'black', isStatic: true,
            onClick() {
                setBoardsCount((prev) => Math.min(5, prev + 1))
            },
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + 20)
                ctx.lineTo(this.x + 30, this.y + 20)
                ctx.lineTo(this.x + 15, this.y)
                ctx.closePath()
                ctx.fill()
            }
        },
        {
            id: GameObjectId.BOARDS, x: 465, y: 450, width: 50, height: 5, color: 'black', isStatic: true,
            draw(ctx) {
                ctx.fillStyle = this.color;
                for (let i = 0; i < boardsCount; ++i) {
                    ctx.fillRect(this.x - this.width / 2, this.y - i * (this.height + 2), this.width, this.height)
                }
            }
        },
    ]);

    const [ offset, setOffset ] = useState({ x: 0, y: 0 });

    const getGameObject = useCallback((id: GameObjectId) => gameObjects.find(object => object.id === id), [ gameObjects ])

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
        setBoardsCount,
        sprites
    }

    return (
        <GameObjectsContext.Provider value={value}>
            {children}
        </GameObjectsContext.Provider>
    )
}
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
import rel from '../assets/rel.svg'
import opticalGate from '../assets/optical_door.png'
import pumpOn from '../assets/pump_off.png'
import pumpOff from '../assets/pump_on.png'
import surface from '../assets/surface.png'
import tableau from '../assets/tableau.png'
import trolley from '../assets/trolley.png'
import buttonMinusBlock from '../assets/button_minus_block.png'
import buttonPlusBlock from '../assets/button_plus_block.png'
import buttonReset from '../assets/button_reset.png'
import buttonStart from '../assets/button_start.png'
import block from '../assets/block.png'
import { useGameObjectsData } from "../hooks/useGameObject.ts";

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
            {
                id: GameObjectId.ADD_BOARD,
                src: buttonPlusBlock
            },
            {
                id: GameObjectId.REMOVE_BOARD,
                src: buttonMinusBlock
            },
            {
                id: GameObjectId.RESET_BUTTON,
                src: buttonReset
            },
            {
                id: GameObjectId.START_BUTTON,
                src: buttonStart
            },
            {
                id: GameObjectId.BOARDS,
                src: block
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

    const [ gameObjects, setGameObjects ] = useState<GameObject[]>(useGameObjectsData({ setBoardsCount, setIsPumpTurnedOn }));

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
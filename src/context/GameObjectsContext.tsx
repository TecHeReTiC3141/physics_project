import { GameObject, GameObjectId } from "../objectsHooks/types.ts";
import {
    createContext,
    useCallback,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    FC,
    useEffect,
} from "react";
import { useGameObjectsData } from "../hooks";
import { useGameAssets } from "../hooks/useGameAssets.ts";

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
    isMagnetReleased: boolean
    setIsMagnetReleased: Dispatch<SetStateAction<boolean>>
    leftTime: number | null
    setLeftTime: Dispatch<SetStateAction<number | null>>
    rightTime: number | null
    setRightTime: Dispatch<SetStateAction<number | null>>
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
    const [ isMagnetReleased, setIsMagnetReleased ] = useState(false);
    const [ leftTime, setLeftTime ] = useState<number | null>(null);
    const [ rightTime, setRightTime ] = useState<number | null>(null);
    const [ boardsCount, setBoardsCount ] = useState(0);

    const gameAssets = useGameAssets(isPumpTurnedOn)

    useEffect(() => {
        gameAssets.forEach(({ id, src }) => {
            const img = new Image();
            img.src = src as string;
            img.onload = () => setSprites(prev => ({ ...prev, [ id ]: img }));
        })
    }, [gameAssets]);

    const [ gameObjects, setGameObjects ] = useState<GameObject[]>(useGameObjectsData({ setBoardsCount, setIsPumpTurnedOn, setIsMagnetReleased }));

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
        isMagnetReleased,
        setIsMagnetReleased,
        leftTime,
        setLeftTime,
        rightTime,
        setRightTime,
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
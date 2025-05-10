import { GameObjectId, Lab307GameObject } from "../types.ts";
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
import { useGameObjectsData, useGameAssets } from "../hooks";
import { GeneratorInputMode } from "../types.ts";

type ContextValue = {
  gameObjects: Lab307GameObject[]
  updateGameObject: (id: GameObjectId, data: Partial<Lab307GameObject>) => void
  getGameObject: (id: GameObjectId) => Lab307GameObject
  isOscilographTurnedOn: boolean
  setIsOscilographTurnedOn: Dispatch<SetStateAction<boolean>>
  isGeneratorTurnedOn: boolean
  setIsGeneratorTurnedOn: Dispatch<SetStateAction<boolean>>
  generatorFrequency: number
  setGeneratorFrequency: Dispatch<SetStateAction<number>>
  generatorVpp: number
  setGeneratorVpp: Dispatch<SetStateAction<number>>
  generatorInputMode: GeneratorInputMode
  setGeneratorInputMode: Dispatch<SetStateAction<GeneratorInputMode>>
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

  const [ isOscilographTurnedOn, setIsOscilographTurnedOn ] = useState(false);
  const [ isGeneratorTurnedOn, setIsGeneratorTurnedOn ] = useState(false);
  const [ generatorFrequency, setGeneratorFrequency ] = useState<number>(0);
  const [ generatorVpp, setGeneratorVpp ] = useState<number>(0);
  const [ generatorInputMode, setGeneratorInputMode ] = useState<GeneratorInputMode>('frequency');

  const gameAssets = useGameAssets({ isOscilographTurnedOn, isGeneratorTurnedOn, generatorInputMode })

  useEffect(() => {
    gameAssets.forEach(({ id, src }) => {
      const img = new Image();
      img.src = src as string;
      img.onload = () => setSprites(prev => ({ ...prev, [ id ]: img }));
    })
  }, [ gameAssets ]);

  const [ gameObjects, setGameObjects ] = useState<Lab307GameObject[]>(useGameObjectsData({
    setGeneratorFrequency,
    setGeneratorVpp,
    setIsGeneratorTurnedOn,
    setIsOscilographTurnedOn,
    setGeneratorInputMode
  }));

  const getGameObject = useCallback((id: GameObjectId) => gameObjects.find(object => object.id === id) as Lab307GameObject, [ gameObjects ])

  const updateGameObject = useCallback((id: GameObjectId, data: Partial<Lab307GameObject>) => {
    setGameObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...data } : obj))
  }, [])

  const value: ContextValue = {
    gameObjects,
    getGameObject,
    updateGameObject,
    isOscilographTurnedOn,
    setIsOscilographTurnedOn,
    isGeneratorTurnedOn,
    setIsGeneratorTurnedOn,
    generatorFrequency,
    setGeneratorFrequency,
    generatorVpp,
    setGeneratorVpp,
    generatorInputMode,
    setGeneratorInputMode,
    sprites
  }

  return (
    <GameObjectsContext.Provider value={value}>
      {children}
    </GameObjectsContext.Provider>
  )
}
import { GameObjectId, GeneratorOutputMode, Lab307GameObject } from "../types.ts";
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
  isOutputTurnedOn: boolean
  setIsOutputTurnedOn: Dispatch<SetStateAction<boolean>>
  generatorFrequency: string
  setGeneratorFrequency: Dispatch<SetStateAction<string>>
  generatorVpp: string
  setGeneratorVpp: Dispatch<SetStateAction<string>>
  generatorInputMode: GeneratorInputMode
  setGeneratorInputMode: Dispatch<SetStateAction<GeneratorInputMode>>
  generatorOutputMode: GeneratorOutputMode
  setGeneratorOutputMode: Dispatch<SetStateAction<GeneratorOutputMode>>
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
  const [ generatorFrequency, setGeneratorFrequency ] = useState('');
  const [ isOutputTurnedOn, setIsOutputTurnedOn ] = useState(false);
  const [ generatorVpp, setGeneratorVpp ] = useState('');
  const [ generatorInputMode, setGeneratorInputMode ] = useState<GeneratorInputMode>(null);
  const [ generatorOutputMode, setGeneratorOutputMode ] = useState<GeneratorOutputMode>(null);

  const gameAssets = useGameAssets({ isOscilographTurnedOn, isGeneratorTurnedOn, generatorInputMode })

  useEffect(() => {
    gameAssets.forEach(({ id, src }) => {
      const img = new Image();
      img.src = src as string;
      img.onload = () => setSprites(prev => ({ ...prev, [ id ]: img }));
    })
  }, [ gameAssets ]);

  const [ gameObjects, setGameObjects ] = useState(useGameObjectsData({
    setGeneratorFrequency,
    setGeneratorVpp,
    setIsGeneratorTurnedOn,
    setIsOscilographTurnedOn,
    setGeneratorInputMode,
    setIsOutputTurnedOn,
    setGeneratorOutputMode
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
    isOutputTurnedOn,
    setIsOutputTurnedOn,
    generatorOutputMode,
    setGeneratorOutputMode,
    sprites
  }

  return (
    <GameObjectsContext.Provider value={value}>
      {children}
    </GameObjectsContext.Provider>
  )
}
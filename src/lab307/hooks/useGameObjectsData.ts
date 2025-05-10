import { Lab307GameObject } from "../types.ts";
import { GameObjectId } from "../types.ts";
import { Dispatch, SetStateAction } from "react";
import { GeneratorInputMode } from "../types.ts";

type Props = {
  setIsOscilographTurnedOn: Dispatch<SetStateAction<boolean>>
  setIsGeneratorTurnedOn: Dispatch<SetStateAction<boolean>>
  setGeneratorFrequency: Dispatch<SetStateAction<number>>
  setGeneratorVpp: Dispatch<SetStateAction<number>>
  setGeneratorInputMode: Dispatch<SetStateAction<GeneratorInputMode>>
}

const SCALE_COEFF = 0.6
const INITIAL_WIDTH = 1782
const INITIAL_HEIGHT = 996

export const useGameObjectsData = ({
                                     setIsOscilographTurnedOn, setIsGeneratorTurnedOn, setGeneratorFrequency,
                                     setGeneratorVpp,
                                     setGeneratorInputMode
                                   }: Props) => {
  const data: Lab307GameObject[] = [
    {
      id: GameObjectId.BASE,
      x: 0,
      y: 0,
      width: INITIAL_WIDTH * SCALE_COEFF,
      height: INITIAL_HEIGHT * SCALE_COEFF,
      color: 'blue',
      isStatic: true,
    },
    {
      id: GameObjectId.GENERATOR_POWER,
      x: 16 * SCALE_COEFF,
      y: 380 * SCALE_COEFF,
      width: 30 * SCALE_COEFF,
      height: 64 * SCALE_COEFF,
      color: 'green',
      onClick: () => setIsGeneratorTurnedOn(prev => !prev)
    },
    {
      id: GameObjectId.FREQUENCY_MODE,
      x: 352 * SCALE_COEFF,
      y: 254 * SCALE_COEFF,
      width: 61 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'green',
      onClick: () => setGeneratorInputMode('frequency')
    },
    {
      id: GameObjectId.VPP_MODE,
      x: 352 * SCALE_COEFF,
      y: 325 * SCALE_COEFF,
      width: 61 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'green',
      onClick: () => setGeneratorInputMode('vpp')
    },

  ]

  return data
}
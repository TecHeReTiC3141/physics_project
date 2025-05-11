import { GeneratorOutputMode, Lab307GameObject } from "../types.ts";
import { GameObjectId } from "../types.ts";
import { Dispatch, SetStateAction } from "react";
import { GeneratorInputMode } from "../types.ts";
import { drawButton } from "./drawButton.ts";

type Props = {
  setIsOscilographTurnedOn: Dispatch<SetStateAction<boolean>>
  setIsGeneratorTurnedOn: Dispatch<SetStateAction<boolean>>
  setIsOutputTurnedOn: Dispatch<SetStateAction<boolean>>
  setGeneratorFrequency: Dispatch<SetStateAction<string>>
  setGeneratorVpp: Dispatch<SetStateAction<string>>
  setGeneratorInputMode: Dispatch<SetStateAction<GeneratorInputMode>>
  setGeneratorOutputMode: Dispatch<SetStateAction<GeneratorOutputMode>>
}

const SCALE_COEFF = 0.6
const INITIAL_WIDTH = 1782
const INITIAL_HEIGHT = 996

export const useGameObjectsData = ({
  setIsOscilographTurnedOn,
  setIsGeneratorTurnedOn,
  setGeneratorFrequency,
  setGeneratorVpp,
  setIsOutputTurnedOn,
  setGeneratorOutputMode,
  setGeneratorInputMode
}: Props) => {
  const data: Lab307GameObject[] = [
    {
      id: GameObjectId.BASE,
      x: 0,
      y: 0,
      width: INITIAL_WIDTH * SCALE_COEFF,
      height: INITIAL_HEIGHT * SCALE_COEFF,
      color: 'white',
      isStatic: true,
    },
    {
      id: GameObjectId.GENERATOR_POWER,
      x: 16 * SCALE_COEFF,
      y: 380 * SCALE_COEFF,
      width: 30 * SCALE_COEFF,
      height: 64 * SCALE_COEFF,
      color: 'green',
      onClick: () => setIsGeneratorTurnedOn(prev => {
        if (prev) {
          setIsOutputTurnedOn(false)
          setGeneratorOutputMode(null)
          setGeneratorInputMode(null)
        }
        return !prev
      })
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
    {
      id: GameObjectId.OUTPUT_BTN,
      x: 757 * SCALE_COEFF,
      y: 355 * SCALE_COEFF,
      width: 40 * SCALE_COEFF,
      height: 16 * SCALE_COEFF,
      color: 'gray',
      active: false,
      text: 'Output',
      onClick: () => setIsOutputTurnedOn(prev => !prev),
      draw(ctx) {
        drawButton.bind(this)(ctx)
      }
    },
    {
      id: GameObjectId.SINE_MODE,
      x: 448 * SCALE_COEFF,
      y: 160 * SCALE_COEFF,
      width: 37 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'gray',
      active: false,
      text: 'Sine',
      onClick: () => setGeneratorOutputMode(prev => prev === 'sine' ? null : 'sine'),
      draw(ctx) {
        drawButton.bind(this)(ctx)
      }
    },
    ...Array.from({ length: 9 }).map((_, index) => ({
      id: GameObjectId[`GENERATOR_NUMPAD_${index + 1}`],
      x: (512 + index % 3 * (37 + 15)) * SCALE_COEFF,
      y: (160 + (2 - Math.floor(index / 3)) * (15 + 21))  * SCALE_COEFF,
      width: 37 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'gray',
      active: false,
      text: `${index + 1}`,
      draw(ctx) {
        drawButton.bind(this)(ctx)
      }
    })),
    {
      id: GameObjectId.GENERATOR_NUMPAD_0,
      x: (512 + (37 + 15)) * SCALE_COEFF,
      y: (160 + 3 * (15 + 21))  * SCALE_COEFF,
      width: 37 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'gray',
      active: false,
      text: '0',
      draw(ctx) {
        drawButton.bind(this)(ctx)
      }
    },
    {
      id: GameObjectId.GENERATOR_NUMPAD_BACKSPACE,
      x: (512 + 2 * (37 + 15)) * SCALE_COEFF,
      y: (160 + 3 * (15 + 21))  * SCALE_COEFF,
      width: 37 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'gray',
      active: false,
      text: '<',
      draw(ctx) {
        drawButton.bind(this)(ctx)
      }
    },
    {
      id: GameObjectId.GENERATOR_NUMPAD_DOT,
      x: 512 * SCALE_COEFF,
      y: (160 + 3 * (15 + 21))  * SCALE_COEFF,
      width: 37 * SCALE_COEFF,
      height: 21 * SCALE_COEFF,
      color: 'gray',
      active: false,
      text: '.',
      onClick: () => {
        if (generatorInputMode === 'frequency') {
          setGeneratorFrequency(prev => prev + '.')
        } else if (generatorInputMode === 'vpp') {
          setGeneratorVpp(prev => prev + '.')
        }
      },
      draw(ctx) {
        drawButton.bind(this)(ctx)
      }
    },
    {
      id: GameObjectId.GENERATOR_DATA,
      x: 189 * SCALE_COEFF,
      y: 260 * SCALE_COEFF,
      width: 68 * SCALE_COEFF,
      height: 17 * SCALE_COEFF,
      color: 'gray',
      isStatic: true
    }
  ]

  return data
}
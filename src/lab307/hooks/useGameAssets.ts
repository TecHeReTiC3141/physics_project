import base from '../assets/base.png';
import regulator from '../assets/regulator.png';
import generatorPowerOn from '../assets/voltageGenerator/powerOn.png';
import generatorPowerOff from '../assets/voltageGenerator/powerOff.png';
import oscilographPowerOn from '../assets/oscilograph/powerOn.png';
import oscilographPowerOff from '../assets/oscilograph/powerOff.png';
import inputModeOn from '../assets/voltageGenerator/inputModeOn.png'
import inputModeOff from '../assets/voltageGenerator/inputModeOff.png'
import { GameObjectId, GeneratorInputMode } from "../types.ts";

type Props = {
  isOscilographTurnedOn: boolean
  isGeneratorTurnedOn: boolean
  generatorInputMode: GeneratorInputMode
}
export const useGameAssets = ({ isOscilographTurnedOn, isGeneratorTurnedOn, generatorInputMode }: Props) => {
  const data = [
    {
      id: GameObjectId.BASE,
      src: base
    },
    {
      id: GameObjectId.GENERATOR_POWER,
      src: isGeneratorTurnedOn ? generatorPowerOn : generatorPowerOff
    },
    {
      id: GameObjectId.FREQUENCY_MODE,
      src: generatorInputMode === 'frequency' ? inputModeOn : inputModeOff
    },
    {
      id: GameObjectId.VPP_MODE,
      src: generatorInputMode === 'vpp' ? inputModeOn : inputModeOff
    },
    {
      id: GameObjectId.OSCILOGRAPG_POWER,
      src: isOscilographTurnedOn ? oscilographPowerOn: oscilographPowerOff
    },
  ]

  return data
}
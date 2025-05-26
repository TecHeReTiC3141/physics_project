import { useGameObjects } from "../context";
import { useCallback, useEffect } from "react";
import { GameObjectId } from "../types.ts";

export const useGeneratorObjects = () => {
  const {
    generatorInputMode,
    setGeneratorFrequency,
    setGeneratorVpp,
    getGameObject,
    updateGameObject,
    isOutputTurnedOn,
    generatorOutputMode,
    isGeneratorTurnedOn,
    generatorFrequency,
    generatorVpp
  } = useGameObjects()

  const drawGeneratorData = useCallback((ctx) => {
    const { x, y } = getGameObject(GameObjectId.GENERATOR_DATA);
    ctx.beginPath()
    ctx.fillStyle = 'black';
    ctx.font = `20px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(generatorFrequency || '------', x, y);

    ctx.fillText(generatorVpp || '------', x, y + 130);
  }, [generatorFrequency, generatorVpp])

  useEffect(() => {
    updateGameObject(GameObjectId.GENERATOR_DATA, { draw: drawGeneratorData })
  }, [drawGeneratorData])

  useEffect(() => {
    updateGameObject(GameObjectId.OUTPUT_BTN, { active: isOutputTurnedOn, isStatic: !isGeneratorTurnedOn })
    updateGameObject(GameObjectId.SINE_MODE, { active: generatorOutputMode === 'sine', isStatic: !isGeneratorTurnedOn })
  }, [ isOutputTurnedOn, generatorOutputMode, updateGameObject, isGeneratorTurnedOn ])

  useEffect(() => {
    Array.from({ length: 10 }).map((_, index) => {
      updateGameObject(GameObjectId[`GENERATOR_NUMPAD_${index}`], {
        isStatic: !isGeneratorTurnedOn,
        onClick: () => {
          if (generatorInputMode === 'frequency') {
            setGeneratorFrequency(prev => prev + index)
          } else if (generatorInputMode === 'vpp') {
            setGeneratorVpp(prev => prev + index)
          }
        }
      })
    })
    updateGameObject(GameObjectId['GENERATOR_NUMPAD_DOT'], {
      isStatic: !isGeneratorTurnedOn,
      onClick: () => {
        if (generatorInputMode === 'frequency') {
          setGeneratorFrequency(prev => prev.includes('.') ? prev : prev + '.')
        } else if (generatorInputMode === 'vpp') {
          setGeneratorVpp(prev => prev.includes('.') ? prev : prev + '.')
        }
      }
    })
    updateGameObject(GameObjectId.GENERATOR_NUMPAD_BACKSPACE, {
      isStatic: !isGeneratorTurnedOn,
      onClick: () => {
        if (generatorInputMode === 'frequency') {
          setGeneratorFrequency(prev => prev.slice(0, -1))
        } else if (generatorInputMode === 'vpp') {
          setGeneratorVpp(prev => prev.slice(0, -1))
        }
      }
    })
    updateGameObject(GameObjectId.GENERATOR_NUMPAD_DOT, {
      isStatic: !isGeneratorTurnedOn,
      onClick: () => {
      if (generatorInputMode === 'frequency') {
        setGeneratorFrequency(prev => prev + '.')
      } else if (generatorInputMode === 'vpp') {
        setGeneratorVpp(prev => prev + '.')
      }
    },
    })
  }, [generatorInputMode, isGeneratorTurnedOn, setGeneratorFrequency, setGeneratorVpp])

}
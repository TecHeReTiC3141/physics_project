import { useGameObjects } from "../context";
import { useCallback, useEffect } from "react";
import { GameObjectId } from "../types.ts";

const kyMax = 50
const kxMax = 100

export const useOscilographObjects = () => {
  const {
    getGameObject,
      scaleX,
      scaleY,
    isOscilographTurnedOn,
    isAcquireModeTurnedOn,
    updateGameObject,
  } = useGameObjects()
  
  useEffect(() => {
    updateGameObject(GameObjectId.ACQUIRE_BTN, { active: isAcquireModeTurnedOn, isStatic: !isOscilographTurnedOn })
  }, [isAcquireModeTurnedOn, isOscilographTurnedOn, updateGameObject])

  const drawOscilographData = useCallback((ctx) => {
    if (!isOscilographTurnedOn) return
    const { x, y } = getGameObject(GameObjectId.OSCILOGRAPH_DATA);
    ctx.beginPath()
    ctx.fillStyle = 'black';
    ctx.font = `20px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(Math.round((scaleX + 1) / 2 * kxMax).toString() || '------', x, y);

    ctx.fillText(Math.round((scaleY + 1) / 2 * kyMax).toString() || '------', x, y + 40);
  }, [scaleX, scaleY, isOscilographTurnedOn])

  useEffect(() => {
    updateGameObject(GameObjectId.OSCILOGRAPH_DATA, { draw: drawOscilographData })
  }, [drawOscilographData])

}
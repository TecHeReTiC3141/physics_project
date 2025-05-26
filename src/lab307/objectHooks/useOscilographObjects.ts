import { useGameObjects } from "../context";
import { useCallback, useEffect } from "react";
import { GameObjectId } from "../types.ts";

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
    const { x, y } = getGameObject(GameObjectId.OSCILOGRAPH_DATA);
    ctx.beginPath()
    ctx.fillStyle = 'black';
    ctx.font = `20px Arial`;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'middle';

    ctx.fillText(scaleX.toFixed(4) || '------', x, y);

    ctx.fillText(scaleY.toFixed(4) || '------', x, y + 40);
  }, [scaleX, scaleY])

  useEffect(() => {
    updateGameObject(GameObjectId.OSCILOGRAPH_DATA, { draw: drawOscilographData })
  }, [drawOscilographData])

}
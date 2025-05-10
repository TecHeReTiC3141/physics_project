import { useGameObjects } from "../context";
import { useCallback, useEffect } from "react";
import { GameObjectId } from "../types.ts";

export const usePump = () => {
    const { updateGameObject, getGameObject, isPumpTurnedOn} = useGameObjects()

    const drawPump = useCallback(function(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'black'
        ctx.font = '12px Arial'
        ctx.fillText('PUMP ' + (isPumpTurnedOn ? 'ON' : 'OFF'), this.x + 10, this.y + 30)
    }, [isPumpTurnedOn])

    useEffect(() => {
        const pump = getGameObject(GameObjectId.PUMP)
        updateGameObject(GameObjectId.PUMP, { draw: drawPump.bind(pump) })
    }, [isPumpTurnedOn]);
}

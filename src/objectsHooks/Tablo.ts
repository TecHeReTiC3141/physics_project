import { useGameObjects } from "../context";
import { GameObjectId } from "./types.ts";
import { useCallback, useEffect } from "react";

export const useTablo = () => {
    const { getGameObject, updateGameObject, leftTime, rightTime, sprites } = useGameObjects()

    const drawTablo = useCallback(function (ctx: CanvasRenderingContext2D) {
        if (!sprites[GameObjectId.TABLO]) return
        ctx.drawImage(sprites[GameObjectId.TABLO]!, this.x, this.y, this.width, this.height)
        ctx.font = '32px MOSCOW2024'
        ctx.fillStyle = 'black'
        if (leftTime) {
            ctx.fillText(leftTime.toString(), this.x + 16, this.y + 70)
        }
        if (rightTime) {
            ctx.fillText(rightTime.toString(), this.x + 125, this.y + 70)
        }
    }, [leftTime, rightTime, sprites])

    useEffect(() => {
        const tableau = getGameObject(GameObjectId.TABLO)
        updateGameObject(GameObjectId.TABLO, { draw: drawTablo.bind(tableau) })
    }, [leftTime, rightTime, sprites]);
}
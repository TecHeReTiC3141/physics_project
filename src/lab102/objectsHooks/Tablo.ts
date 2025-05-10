import { useGameObjects } from "../context";
import { GameObjectId } from "./types.ts";
import { useCallback, useEffect } from "react";

export const useTablo = () => {
    const { getGameObject, updateGameObject, isMagnetReleased, leftTime, rightTime, sprites } = useGameObjects()

    const drawTablo = useCallback(function (ctx: CanvasRenderingContext2D) {
        if (!sprites[GameObjectId.TABLO]) return
        ctx.drawImage(sprites[GameObjectId.TABLO]!, this.x, this.y, this.width, this.height)
        ctx.font = '32px MOSCOW2024'
        ctx.fillStyle = 'black'

        if (leftTime) {
            ctx.fillText(leftTime.toString(), this.x + 35, this.y + 70)
        }
        if (rightTime) {
            ctx.fillText(rightTime.toString(), this.x + 135, this.y + 70)
        }
        ctx.beginPath()
        ctx.fillStyle = isMagnetReleased ? 'green' : 'red'
        ctx.arc(this.x + 210, this.y + 20, 4, 0, Math.PI * 2)
        ctx.fill()
    }, [leftTime, rightTime, sprites, isMagnetReleased])

    useEffect(() => {
        const tableau = getGameObject(GameObjectId.TABLO)
        updateGameObject(GameObjectId.TABLO, { draw: drawTablo.bind(tableau) })
    }, [leftTime, rightTime, sprites, isMagnetReleased]);
}
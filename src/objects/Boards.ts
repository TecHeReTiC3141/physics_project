import { useGameObjects } from "../context";
import { useCallback, useEffect } from "react";
import { GameObjectId } from "./types.ts";

export const useBoards = () => {
    const { updateGameObject, getGameObject, isPumpTurnedOn, boardsCount} = useGameObjects()

    const drawBoards = useCallback(function(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        for (let i = 0; i < boardsCount; ++i) {
            ctx.fillRect(this.x - this.width / 2, this.y - i * (this.height + 2), this.width, this.height)
        }
    }, [boardsCount])

    useEffect(() => {
        const boards = getGameObject(GameObjectId.BOARDS)
        updateGameObject(GameObjectId.BOARDS, { draw: drawBoards.bind(boards) })
    }, [boardsCount]);
}

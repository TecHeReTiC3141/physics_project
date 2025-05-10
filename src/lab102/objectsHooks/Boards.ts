import { useGameObjects } from "../context";
import { useCallback, useEffect } from "react";
import { GameObjectId } from "../types.ts";

export const useBoards = () => {
    const { updateGameObject, getGameObject, sprites, boardsCount} = useGameObjects()

    const drawBoards = useCallback(function(ctx: CanvasRenderingContext2D) {
        if (!sprites[GameObjectId.BOARDS]) return
        for (let i = 0; i < boardsCount; ++i) {
            ctx.drawImage(sprites[GameObjectId.BOARDS]!, this.x - this.width / 2, this.y - i * (this.height + 2), this.width, this.height)
        }
    }, [sprites, boardsCount])

    useEffect(() => {
        const boards = getGameObject(GameObjectId.BOARDS)
        updateGameObject(GameObjectId.BOARDS, { draw: drawBoards.bind(boards) })
    }, [drawBoards, boardsCount]);
}

import { useMemo } from "react";
import { GameObjectId } from "../objectsHooks/types.ts";
import rel from "../assets/sprites/rel.svg";
import trolley from "../assets/sprites/trolley.png";
import opticalGate from "../assets/sprites/optical_door.png";
import tableau from "../assets/sprites/tableau.png";
import pumpOn from "../assets/sprites/pump_on.png";
import pumpOff from "../assets/sprites/pump_off.png";
import surface from "../assets/sprites/surface.png";
import buttonPlusBlock from "../assets/sprites/button_plus_block.png";
import buttonMinusBlock from "../assets/sprites/button_minus_block.png";
import buttonReset from "../assets/sprites/button_reset.png";
import buttonStart from "../assets/sprites/button_start.png";
import block from "../assets/sprites/block.png";

const useGameAssets = (isPumpTurnedOn) => {
    const data = useMemo(() => (
        [
            {
                id: GameObjectId.RAIL,
                src: rel
            },
            {
                id: GameObjectId.CART,
                src: trolley
            },
            {
                id: GameObjectId.GATE_LEFT,
                src: opticalGate
            },
            {
                id: GameObjectId.GATE_RIGHT,
                src: opticalGate
            },
            {
                id: GameObjectId.TABLO,
                src: tableau
            },
            {
                id: GameObjectId.PUMP,
                src: isPumpTurnedOn ? pumpOn : pumpOff
            },
            {
                id: GameObjectId.GROUND,
                src: surface
            },
            {
                id: GameObjectId.ADD_BOARD,
                src: buttonPlusBlock
            },
            {
                id: GameObjectId.REMOVE_BOARD,
                src: buttonMinusBlock
            },
            {
                id: GameObjectId.RESET_BUTTON,
                src: buttonReset
            },
            {
                id: GameObjectId.START_BUTTON,
                src: buttonStart
            },
            {
                id: GameObjectId.BOARDS,
                src: block
            },
        ]
    ), [isPumpTurnedOn])

    return data
}

export { useGameAssets }

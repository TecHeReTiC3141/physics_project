import { useMemo } from "react";
import { GameObjectId } from "../objectsHooks/types.ts";
import rel from "../assets/rel.svg";
import trolley from "../assets/trolley.png";
import opticalGate from "../assets/optical_door.png";
import tableau from "../assets/tableau.png";
import pumpOn from "../assets/pump_on.png";
import pumpOff from "../assets/pump_off.png";
import surface from "../assets/surface.png";
import buttonPlusBlock from "../assets/button_plus_block.png";
import buttonMinusBlock from "../assets/button_minus_block.png";
import buttonReset from "../assets/button_reset.png";
import buttonStart from "../assets/button_start.png";
import block from "../assets/block.png";

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

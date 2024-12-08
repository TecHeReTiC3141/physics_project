import {calculateSecondTableDto, SecondTableDto} from "./secondTable";
import {calculateThirdTableDto, ThirdTableDto} from "./thirdTable";

type TableNumber = 3 | 4;

type LogicProcessing = {
    [key in TableNumber]: {
        leftGate: number;
        rightGate: number;
        blocks: number;
    };
};

export function processSimulatorState(state: LogicProcessing): SecondTableDto | ThirdTableDto | void {
    if (state[3]) {
        const {leftGate, rightGate, blocks} = state[3];
        if (blocks === 1) {
            return calculateSecondTableDto(leftGate, rightGate)
        } else {
            throw new Error(`Unexpected block count ${blocks} second table`)
        }
    } else if (state[4]) {
        const {leftGate, rightGate, blocks} = state[4];
        if (blocks > 0 && blocks < 6) {
            return calculateThirdTableDto(blocks)
        } else {
            throw new Error(`Unexpected block count ${blocks} second table`)
        }
    }
}

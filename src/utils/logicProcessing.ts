import {calculateThirdTableDto, SecondTableDto} from "./secondTable";
import {calculateFourthTableDto, ThirdTableDto} from "./fourthTable.ts";

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
            return calculateThirdTableDto(leftGate, rightGate)
        } else {
            throw new Error(`Unexpected block count ${blocks} second table`)
        }
    } else if (state[4]) {
        const {leftGate, rightGate, blocks} = state[4];
        if (blocks > 0 && blocks < 6) {
            return calculateFourthTableDto(blocks)
        } else {
            throw new Error(`Unexpected block count ${blocks} second table`)
        }
    }
}

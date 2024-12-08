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
    if (state[4]) {
        console.log("таблица 4");
        return;
    }

    if (state[3]) {
        const {leftGate, rightGate, blocks} = state[3];
        if (blocks === 1) {
            if (leftGate === 0.15 && rightGate === 0.40) {
                return calculateSecondTableDto(0.15, 0.4);
            } else if (leftGate === 0.15 && rightGate === 0.50) {
                return calculateSecondTableDto(0.15, 0.5);
            } else if (leftGate === 0.15 && rightGate === 0.70) {
                return calculateSecondTableDto(0.15, 0.7);
            } else if (leftGate === 0.15 && rightGate === 0.90) {
                return calculateSecondTableDto(0.15, 0.9);
            } else if (leftGate === 0.15 && rightGate === 1.10) {
                return calculateSecondTableDto(0.15, 1.1);
            } else {
                throw new Error("Unexpected left and right gates for second table")
            }
        } else {
            throw new Error(`Unexpected block count ${blocks} second table`)
        }
    } else if (state[4]) {
        const {leftGate, rightGate, blocks} = state[4];
        if (leftGate==0.15 && rightGate==1.1) {
            return calculateThirdTableDto(blocks)
        } else {
            throw new Error(`Unexpected left/right gate for second table`)
        }
    }
}

import { calculateThirdTableDto, SecondTableDto } from "./thirdTable.ts";
import { calculateFourthTableDto, ThirdTableDto } from "./fourthTable.ts";

enum TableNumber {
    THIRD = 3,
    FOURTH = 4
}

type LogicProcessing = {
    [key in TableNumber]: {
        leftGate: number;
        rightGate: number;
        blocks: number;
    };
};

export function processSimulatorState(state: LogicProcessing): SecondTableDto | ThirdTableDto | void {
    if (state[ TableNumber.THIRD ]) {
        const { leftGate, rightGate, blocks } = state[ 3 ];
        if (blocks === 1) {
            return calculateThirdTableDto(leftGate, rightGate)
        } else {
            throw new Error(`Unexpected block count ${blocks} third table`)
        }
    } else if (state[ TableNumber.FOURTH ]) {
        const { blocks } = state[ 4 ];
        if (blocks > 0 && blocks < 6) {
            return calculateFourthTableDto(blocks)
        } else {
            throw new Error(`Unexpected block count ${blocks} fourth table`)
        }
    }
}
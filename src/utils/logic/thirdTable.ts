export type ThirdTableDto = {
    t1: number;
    t2: number;
    deviation: number;
};

export function normalizeGatesForThirdTable(
    leftGate: number,
    rightGate: number
): { normalizedLeftGate: number; normalizedRightGate: number } {
    const validRightGates = [ 0.40, 0.50, 0.70, 0.90, 1.10 ];
    const validLeftGate = 0.15;

    const normalizedRightGate = validRightGates.reduce((prev, curr) =>
        Math.abs(curr - rightGate) < Math.abs(prev - rightGate) ? curr : prev
    );

    return { normalizedLeftGate: validLeftGate, normalizedRightGate };
}

export function calculateThirdTableDto(leftGate: number, rightGate: number): ThirdTableDto {
    const { normalizedRightGate } = normalizeGatesForThirdTable(leftGate, rightGate);
    let t1 = 1.3
    let t2 = 2.5
    if (normalizedRightGate === .4) {
        t1 = 1.3
        t2 = 2.5
    } else if (normalizedRightGate === .5) {
        t1 = 1.2
        t2 = 3.1
    } else if (normalizedRightGate === .7) {
        t1 = 1.3
        t2 = 3.5
    } else if (normalizedRightGate === .9) {
        t1 = 1.3
        t2 = 4.1
    } else if (normalizedRightGate === 1.1) {
        t1 = 1.4
        t2 = 4.6
    } else {
        throw new Error(`Unexpected block count for third table`)
    }

    const randomOffset = () => (-.3 + Math.random() * 0.6);
    const t1New = Number((t1 + randomOffset()).toPrecision(2));
    const t2New = Number((t2 + randomOffset()).toPrecision(2));

    const deviation = Number(((t1New ** 2 - t2New ** 2) / 2.).toPrecision(2));

    return { t1: t1New, t2: t2New, deviation };
}


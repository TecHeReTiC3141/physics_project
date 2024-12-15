export type SecondTableDto = {
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

export function calculateThirdTableDto(leftGate: number, rightGate: number): SecondTableDto {
    const { normalizedLeftGate, normalizedRightGate } = normalizeGatesForThirdTable(leftGate, rightGate);

    const randomOffset = () => (-.3 + Math.random() * 0.6);
    const t1New = Number((normalizedLeftGate + randomOffset()).toPrecision(2));
    const t2New = Number((normalizedRightGate + randomOffset()).toPrecision(2));

    const deviation = Number(((t1New ** 2 - t2New ** 2) / 2.).toPrecision(2));

    return { t1: t1New, t2: t2New, deviation };
}


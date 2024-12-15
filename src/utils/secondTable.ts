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
    const validLeftGate = 0.15; // Единственное допустимое значение для leftGate

    // Нормируем значение rightGate к ближайшему из допустимых
    const normalizedRightGate = validRightGates.reduce((prev, curr) =>
        Math.abs(curr - rightGate) < Math.abs(prev - rightGate) ? curr : prev
    );

    return { normalizedLeftGate: validLeftGate, normalizedRightGate };
}

export function calculateThirdTableDto(leftGate: number, rightGate: number): SecondTableDto {
    // Нормализуем gates
    const { normalizedLeftGate, normalizedRightGate } = normalizeGatesForThirdTable(leftGate, rightGate);

    const randomOffset = () => (-.3 + Math.random() * 0.6);
    const t1New = normalizedLeftGate + randomOffset();  // Значение t1 с добавлением случайного смещения
    const t2New = normalizedRightGate + randomOffset();  // Значение t2 с добавлением случайного смещения

    // Вычисление отклонения
    const deviation = (t1New ** 2 - t2New ** 2) / 2;

    // Возвращаем объект SecondTableDto
    return { t1: t1New, t2: t2New, deviation };
}


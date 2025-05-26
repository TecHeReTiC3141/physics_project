export type FourthTableDto = { t1: number; t2: number }


export function calculateFourthTableDto(block: number): FourthTableDto {
    const randomOffset = () => Number((-0.2 + Math.random() * 0.4).toFixed(2));
    let t1 = 0
    let t2 = 0
    if (block === 0) {
        return {t1: -1, t2: -1};
    } else if (block === 1) {
        t1 = 1.3
        t2 = 4.5
    } else if (block === 2) {
        t1 = 0.9
        t2 = 3.2
    } else if (block === 3) {
        t1 = 0.7
        t2 = 2.6
    } else if (block === 4) {
        t1 = 0.6
        t2 = 2.2
    } else if (block === 5) {
        t1 = 0.5
        t2 = 2
    } else {
        throw new Error(`Unexpected block count for fourth table`)
    }

    const t1New = Number((t1 + randomOffset()).toFixed(2));
    const t2New = Number((t2 + randomOffset()).toFixed(2));

    return {t1: t1New, t2: t2New};
}

export type ThirdTableDto = Array<{ t1: number; t2: number }>


export function calculateFourthTableDto(block: number): ThirdTableDto {
    const randomOffset = () => (-.3 + Math.random() * 0.6);
    const fourthTableDto: ThirdTableDto = [];
    let t1 = 0
    let t2 = 0
    if (block === 1) {
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
        throw new Error(`Unexpected block count for third table`)
    }

    for (let i = 0; i < 5; i++) {
        const t1New = t1 + randomOffset();
        const t2New = t2 + randomOffset();
        fourthTableDto.push({t1: t1New, t2: t2New});
    }

    return fourthTableDto;
}

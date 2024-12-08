export type SecondTableDto = {
    t1: number;
    t2: number;
    deviation: number;
};


export function calculateSecondTableDto(t1: number, t2: number): SecondTableDto {
    const randomOffset = () => Math.random() * 0.3;
    const t1New = t1 + randomOffset();
    const t2New = t2 + randomOffset();
    const deviation = (t1 ** 2 - t2 ** 2) / 2;
    return {t1: t1New, t2: t2New, deviation: deviation};
}

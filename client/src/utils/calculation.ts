export function round(num: number, decimalPlaces: number = 1) {
    const multiplier = 10 ** decimalPlaces;
    return Math.round(num * multiplier) / multiplier;
}

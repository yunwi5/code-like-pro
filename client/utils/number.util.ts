export function mod(n: number, total: number) {
  return ((n % total) + total) % total;
}

export function round(num: number, decimalPlaces: number = 1) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(num * multiplier) / multiplier;
}

export function numberSuffix(i: number) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

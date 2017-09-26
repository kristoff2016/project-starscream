export function isNumeric(n: any) {
  return !isNaN(n);
}

export function isInt(n: any) {
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n: any) {
  return Number(n) === n && n % 1 !== 0;
}

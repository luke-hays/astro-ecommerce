export const sumValues = (obj: { [index: string]: number }) =>
  Object.values(obj).reduce((prev, curr) => prev + curr, 0);

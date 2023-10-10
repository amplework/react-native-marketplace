export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: omittedValue, ...rest } = obj;

  return rest;
};

export const isObject = (value: any): value is Record<string, any> =>
  typeof value === 'object';

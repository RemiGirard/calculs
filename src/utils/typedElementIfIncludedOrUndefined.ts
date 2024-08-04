export default <T>(anArray: readonly T[], value: unknown): T|undefined => {
  if ((anArray as unknown[]).includes(value)) {
    return value as T;
  }
  return undefined;
};

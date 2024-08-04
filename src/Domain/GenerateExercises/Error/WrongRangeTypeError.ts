export class WrongRangeTypeError extends Error {
  constructor(expected: string, current: string) {
    super('Wrong range type. Expected: ' + expected + ', current: ' + current);
  }
}
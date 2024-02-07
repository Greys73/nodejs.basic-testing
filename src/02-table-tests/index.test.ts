import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 11, b: 22, action: Action.Add, expected: 33 },
  { a: 12.5, b: 32.5, action: Action.Add, expected: 45 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: 11, b: 22, action: Action.Subtract, expected: -11 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 0, b: 0, action: Action.Multiply, expected: 0 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: -1, b: -1, action: Action.Multiply, expected: 1 },
  { a: -1, b: 1, action: Action.Multiply, expected: -1 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: '#', expected: null },
  { a: '2', b: 3, action: Action.Add, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test('should blah-blah', () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});

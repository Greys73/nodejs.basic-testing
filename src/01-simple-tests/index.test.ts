import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;
    expect(simpleCalculator({ a: 11, b: 22, action })).toBe(33);
    expect(simpleCalculator({ a: 1, b: 9, action })).toBe(10);
    expect(simpleCalculator({ a: 12.5, b: 32.5, action })).toBe(45);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    expect(simpleCalculator({ a: 1, b: 0, action })).toBe(1);
    expect(simpleCalculator({ a: 0, b: 0, action })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 1, action })).toBe(0);
    expect(simpleCalculator({ a: 11, b: 22, action })).toBe(-11);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    expect(simpleCalculator({ a: 1, b: 0, action })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 0, action })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 1, action })).toBe(1);
    expect(simpleCalculator({ a: -1, b: -1, action })).toBe(1);
    expect(simpleCalculator({ a: -1, b: 1, action })).toBe(-1);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    expect(simpleCalculator({ a: 6, b: 3, action })).toBe(2);
    expect(simpleCalculator({ a: 1, b: 2, action })).toBe(0.5);
    expect(simpleCalculator({ a: 10, b: 3, action })).toBe(3.3333333333333335);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    expect(simpleCalculator({ a: 2, b: 3, action })).toBe(8);
    expect(simpleCalculator({ a: 3, b: 2, action })).toBe(9);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '?' })).toBe(null);
    expect(simpleCalculator({ a: 2, b: 3, action: '#' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const action = Action.Add;
    expect(simpleCalculator({ a: '2', b: 3, action })).toBe(null);
    expect(simpleCalculator({ a: null, b: 3, action })).toBe(null);
  });
});

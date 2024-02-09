import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'some value';
    const result = await resolveValue(value);
    expect(result).toEqual(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'some value';
    expect(() => throwError(msg)).toThrowErrorMatchingSnapshot(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowErrorMatchingSnapshot('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});

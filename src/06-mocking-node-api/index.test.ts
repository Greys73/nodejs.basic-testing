import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 100;
    const count = 7;
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * count);
    expect(callback).toHaveBeenCalledTimes(count);
  });
});

const fileContent = 'Some text in file';

jest.mock('path', () => ({ join: (_: string, path: string) => `c:\\${path}` }));
jest.mock('fs', () => ({
  existsSync: (path: string) => path === 'c:\\file.txt',
}));
jest.mock('fs/promises', () => ({ readFile: async () => fileContent }));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const text = await readFileAsynchronously('file.txt');
    expect(typeof text).toBe('string');
  });

  test('should return null if file does not exist', async () => {
    const text = await readFileAsynchronously('wrongFile.txt');
    expect(text).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const text = await readFileAsynchronously('file.txt');
    expect(text).toBe(fileContent);
  });
});

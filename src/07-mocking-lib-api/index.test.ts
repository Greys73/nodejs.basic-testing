import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const api = {
  url: 'https://jsonplaceholder.typicode.com/testpath',
  data: 'Some data from API',
};

jest.mock('axios', () => {
  return {
    create: (config: { baseURL: string }) => {
      return {
        get: async (path: string) => {
          const result =
            `${config.baseURL}/${path}` === api.url
              ? { data: api.data }
              : { data: null };
          console.log(api.url);
          return result;
        },
      };
    },
  };
});

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    const relativePath = 'someValue';
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(console, 'log').mockImplementation();
    const relativePath = 'testpath';
    await throttledGetDataFromApi(relativePath);
    expect(console.log).toHaveBeenCalledWith(api.url);
  });

  test('should return response data', async () => {
    const relativePath = 'testpath';
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toBe(api.data);
  });
});

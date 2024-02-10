import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = [1, 2, 3, 4, 5, 6];
  const linkedList = generateLinkedList(elements);
  const expList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: {
            value: 5,
            next: {
              value: 6,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(linkedList).toStrictEqual(expList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(linkedList).toMatchSnapshot();
  });
});

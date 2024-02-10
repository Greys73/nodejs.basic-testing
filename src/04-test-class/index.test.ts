import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from './index';

let accountA: BankAccount;
let accountB: BankAccount;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    accountA = getBankAccount(500);
    expect(accountA.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => accountA.withdraw(600)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    accountB = getBankAccount(1000);
    expect(() => accountA.transfer(600, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => accountA.transfer(600, accountA)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    accountA.deposit(300);
    expect(accountA.getBalance()).toBe(800);
  });

  test('should withdraw money', () => {
    accountA.withdraw(300);
    expect(accountA.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    accountA.transfer(300, accountB);
    expect(accountA.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await accountB.fetchBalance();
    if (balance) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 1000;
    accountA.fetchBalance = jest.fn().mockResolvedValue(newBalance);
    await accountA.synchronizeBalance();
    expect(accountA.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    accountA.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(accountA.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

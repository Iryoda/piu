import HashProvider from './HashProvider';

let hashProvider: HashProvider;

describe('HashProvider', () => {
  beforeEach(() => {
    hashProvider = new HashProvider();
  });

  it('Should hash correctly', () => {
    const password = '12345678';
    expect(hashProvider.generateHash(password)).not.toEqual(password);
  });

  it('Should compare correctly', async () => {
    const password = '12345678';

    const hashed = await hashProvider.generateHash(password);
    const checkIfEqual = await hashProvider.compareHash(password, hashed);

    expect(checkIfEqual).toEqual(true);
  });
});

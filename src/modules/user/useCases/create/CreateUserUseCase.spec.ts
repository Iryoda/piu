import AppError from '@shared/errors';
import CreateUserService from './CreateUserUseCase';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';

let userRepositoryInMemory: InMemoryUserRepository;
let createUserService: CreateUserService;
let hashProvider: HashProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUserRepository();
    hashProvider = new HashProvider();

    createUserService = new CreateUserService(
      userRepositoryInMemory,
      hashProvider,
    );
  });

  it('Should create user correctly', async () => {
    const user = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    const sut = await createUserService.handle(user);

    expect(sut).toHaveProperty('id');
  });

  it('Should not return 400 if have same email', async () => {
    const user = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    const userError = {
      name: 'any_name2',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username2',
    };

    await createUserService.handle(user);

    await expect(createUserService.handle(userError)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should not return 400 if have same username', async () => {
    const user = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    const userError = {
      name: 'any_name',
      email: 'other_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    await createUserService.handle(user);

    await expect(createUserService.handle(userError)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should hash password been called correctly', async () => {
    const generate = jest.spyOn(hashProvider, 'generateHash');

    const user = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    await createUserService.handle(user);

    expect(generate).toHaveBeenCalledWith('any_password');
  });

  it('Should hash password match generated hash', async () => {
    const generate = jest.spyOn(hashProvider, 'generateHash');

    const mockedPassword = 'hashed_password';

    generate.mockResolvedValue(mockedPassword);

    const user = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    };

    const response = await createUserService.handle(user);

    expect(response.password).toEqual(mockedPassword);
  });
});

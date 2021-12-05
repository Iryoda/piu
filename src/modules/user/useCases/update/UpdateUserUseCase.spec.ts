import User from '@modules/user/domain/User';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import AppError from '@shared/errors';
import ShouldBeUnique from '@shared/errors/ShouldBeUnique';
import CreateUserUseCase from '../create/CreateUserUseCase';
import UpdateUserUseCase from './UpdateUserUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let updateUserUseCase: UpdateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let hashProvider: HashProvider;
let user: User;

describe('UpdateUserUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashProvider = new HashProvider();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
      hashProvider,
    );
    updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    user = await createUserUseCase.handle({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('Should update user correctly', async () => {
    const updatedUser = await updateUserUseCase.handle({
      id: user.id,
      data: { username: 'any_username2' },
    });

    expect(updatedUser.username).toEqual('any_username2');
  });

  it('Should throw error if a param are invalid', async () => {
    const invalidData = { username: 'any_username2', userId: 'invalid_id' };

    await expect(
      updateUserUseCase.handle({
        id: user.id,
        data: invalidData,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error if update user if already booked username', async () => {
    await expect(
      updateUserUseCase.handle({
        id: user.id,
        data: { username: 'any_username' },
      }),
    ).rejects.toBeInstanceOf(ShouldBeUnique);
  });
});

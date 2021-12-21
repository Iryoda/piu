import User from '@modules/user/domain/User';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import ShouldBeUnique from '@shared/errors/ShouldBeUnique';
import UpdateUserUseCase from './UpdateUserUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let updateUserUseCase: UpdateUserUseCase;
let user: User;

describe('UpdateUserUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    });
  });

  it('Should update user correctly', async () => {
    const updatedUser = await updateUserUseCase.handle({
      id: user.id,
      data: { username: 'any_username2' },
    });

    expect(updatedUser.username).toEqual('any_username2');
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

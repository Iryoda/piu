import User from '@modules/user/domain/User';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import AppError from '@shared/errors';
import DeleteUserUseCase from './DeleteUserUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let deleteUserUseCase: DeleteUserUseCase;
let user: User;

describe('DeleteUserUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUserRepository);

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('Should not delete user by invalid id', async () => {
    await expect(deleteUserUseCase.deleteById('any_id')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should delete user by id correctly', async () => {
    await deleteUserUseCase.deleteById(user.id);

    await expect(deleteUserUseCase.deleteById(user.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

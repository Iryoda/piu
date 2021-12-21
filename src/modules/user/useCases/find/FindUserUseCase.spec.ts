import User from '@modules/user/domain/User';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/errors';
import FindUserUseCase from './FindUserUseCase';

let findUserUseCase: FindUserUseCase;
let inMemoryUserRepository: IUserRepository;
let user: User;

describe('FindUserUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    findUserUseCase = new FindUserUseCase(inMemoryUserRepository);

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_username',
    });

    await inMemoryUserRepository.create({
      name: 'any_name2',
      email: 'any_email2',
      password: 'any_password2',
      username: 'any_username2',
    });
  });

  it('Should find one user by id', async () => {
    const findUser = await findUserUseCase.findOneById(user.id);

    expect(findUser.name).toEqual(user.name);
  });

  it('Should throw error when id not match', async () => {
    await expect(findUserUseCase.findOneById('any_id')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should find all user', async () => {
    const findAllUser = await findUserUseCase.findAll();

    expect(findAllUser).toHaveLength(2);
  });
});

import User from '@modules/user/domain/User';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import AppError from '@shared/errors';
import CreateUserUseCase from '../create/CreateUserUseCase';
import FindUserUseCase from './FindUserUseCase';

let findUserUseCase: FindUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: IUserRepository;
let hashProvider: HashProvider;
let user: User;

describe('FindUserUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashProvider = new HashProvider();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
      hashProvider,
    );
    findUserUseCase = new FindUserUseCase(inMemoryUserRepository);

    user = await createUserUseCase.handle({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_username',
    });

    await createUserUseCase.handle({
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

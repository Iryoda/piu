import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import User from '@modules/user/domain/User';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import AppError from '@shared/errors';
import CreatePostUseCase from './CreatePostUseCase';

let inMemoryPostRepository: InMemoryPostRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let createPostUseCase: CreatePostUseCase;
let user: User;

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    inMemoryPostRepository = new InMemoryPostRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    createPostUseCase = new CreatePostUseCase(
      inMemoryPostRepository,
      inMemoryUserRepository,
    );

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_username;',
    });
  });

  it('Should create a post correctly', async () => {
    const profile = await createPostUseCase.handle({
      userId: user.id,
      data: { content: 'any_content' },
    });

    expect(profile).toHaveProperty('id');
  });

  it('Should throw an error if userId is invalid', async () => {
    await expect(
      createPostUseCase.handle({
        userId: 'any_id',
        data: { content: 'any_content' },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

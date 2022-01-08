import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import CreatePostUseCase from './CreatePostUseCase';
import NotFound from '@shared/errors/NotFound';
import User from '@modules/user/domain/User';

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
      content: 'any_content',
    });

    expect(profile).toHaveProperty('id');
  });

  it('Should throw an error if userId is invalid', async () => {
    await expect(
      createPostUseCase.handle({
        userId: 'invalid_id',
        content: 'any_content',
      }),
    ).rejects.toBeInstanceOf(NotFound);
  });
});

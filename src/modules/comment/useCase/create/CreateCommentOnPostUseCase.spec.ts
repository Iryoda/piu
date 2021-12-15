import InMemoryCommentRepository from '@modules/comment/repository/inMemory/InMemoryCommentRepository';
import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import CreateCommentOnPostUseCase from './CreateCommentOnPostUseCase';
import Post from '@modules/post/domain/Post';
import User from '@modules/user/domain/User';

import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import NotFound from '@shared/errors/NotFound';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let inMemoryCommentRepository: InMemoryCommentRepository;
let createCommentOnPostUseCase: CreateCommentOnPostUseCase;
let user: User;
let post: Post;

describe('CreateCommentOnPostUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryPostRepository = new InMemoryPostRepository();
    inMemoryCommentRepository = new InMemoryCommentRepository();

    createCommentOnPostUseCase = new CreateCommentOnPostUseCase(
      inMemoryUserRepository,
      inMemoryPostRepository,
      inMemoryCommentRepository,
    );

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_username',
    });

    post = await inMemoryPostRepository.create({
      userId: user.id,
      content: 'any_content',
    });
  });

  it('Should create comment correctly', async () => {
    const comment = await createCommentOnPostUseCase.handle({
      content: 'any_content',
      userId: user.id,
      postId: post.id,
    });

    expect(comment).toHaveProperty('id');
  });

  it('Should throw error if a invalid param is provided', async () => {
    const comment = {
      invalidParam: 'invalid_param',
      content: 'any_content',
      userId: user.id,
      postId: post.id,
    };

    await expect(
      createCommentOnPostUseCase.handle(comment),
    ).rejects.toBeInstanceOf(InvalidParam);
  });

  it('Should throw an error if a param is missing', async () => {
    const comment = {
      content: 'any_content',
      postId: post.id,
    };

    await expect(
      // eslint-disable-next-line
      createCommentOnPostUseCase.handle(comment as any),
    ).rejects.toBeInstanceOf(MissingParam);
  });

  it('Should trow an error if invalid userId is provided', async () => {
    const comment = {
      content: 'any_content',
      userId: 'invalid_id',
      postId: post.id,
    };

    await expect(
      createCommentOnPostUseCase.handle(comment),
    ).rejects.toBeInstanceOf(NotFound);
  });

  it('Should trow an error if invalid postId is provided', async () => {
    const comment = {
      content: 'any_content',
      userId: user.id,
      postId: 'invalid_id',
    };

    await expect(
      createCommentOnPostUseCase.handle(comment),
    ).rejects.toBeInstanceOf(NotFound);
  });
});

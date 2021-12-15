import InMemoryCommentRepository from '@modules/comment/repository/inMemory/InMemoryCommentRepository';
import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import CreateResponseUseCase from './CreateResponseUseCase';

import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import NotFound from '@shared/errors/NotFound';

import Comment from '@modules/comment/domain/Comment';
import User from '@modules/user/domain/User';
import Post from '@modules/post/domain/Post';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryCommentRepository: InMemoryCommentRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let createResponseUseCase: CreateResponseUseCase;
let user: User;
let post: Post;
let comment: Comment;

describe('CreateResponseUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryPostRepository = new InMemoryPostRepository();
    inMemoryCommentRepository = new InMemoryCommentRepository();

    createResponseUseCase = new CreateResponseUseCase(
      inMemoryUserRepository,
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

    comment = await inMemoryCommentRepository.createOnPost({
      userId: user.id,
      postId: post.id,
      content: 'any_content',
    });
  });

  it('Should create a response correctly', async () => {
    const response = await createResponseUseCase.handle({
      userId: user.id,
      commentId: comment.id,
      content: 'any_content_2',
    });

    expect(response).toHaveProperty('id');
    expect(response.content).toEqual('any_content_2');
  });

  it('Should throw an error if an invalid param is provided', async () => {
    const data = {
      userId: user.id,
      commentId: comment.id,
      content: 'any_content_2',
      invalidParam: 'invalid_param',
    };

    await expect(createResponseUseCase.handle(data)).rejects.toBeInstanceOf(
      InvalidParam,
    );
  });

  it('Should throw an error if a param is missing', async () => {
    const data = {
      userId: user.id,
      commentId: comment.id,
    };

    await expect(
      createResponseUseCase.handle(data as any),
    ).rejects.toBeInstanceOf(MissingParam);
  });

  it('Should throw an error if content is null', async () => {
    const data = {
      userId: user.id,
      commentId: comment.id,
      content: '',
    };

    await expect(
      createResponseUseCase.handle(data as any),
    ).rejects.toBeInstanceOf(MissingParam);
  });

  it('Should throw an error if userId does not exist', async () => {
    const data = {
      userId: 'any_id',
      commentId: comment.id,
      content: 'any_content2',
    };

    await expect(
      createResponseUseCase.handle(data as any),
    ).rejects.toBeInstanceOf(NotFound);
  });

  it('Should throw an error if commentId does not exist', async () => {
    const data = {
      userId: user.id,
      commentId: 'any_id',
      content: 'any_content2',
    };

    await expect(
      createResponseUseCase.handle(data as any),
    ).rejects.toBeInstanceOf(NotFound);
  });
});

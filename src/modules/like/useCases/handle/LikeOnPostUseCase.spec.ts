import InMemoryLikeRepository from '@modules/like/repositories/inMemory/InMemoryLikeRepository';
import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import LikeOnPostUseCase from './LikeOnPostUseCase';
import User from '@modules/user/domain/User';
import Post from '@modules/post/domain/Post';
import AppError from '@shared/errors';
import ICreateLikePostDTO from '@modules/like/dtos/ICreateLikePostDTO';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let inMemoryLikeRepository: InMemoryLikeRepository;
let likeOnPostUseCase: LikeOnPostUseCase;
let user: User;
let post: Post;

describe('LikeOnPostUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryPostRepository = new InMemoryPostRepository();
    inMemoryLikeRepository = new InMemoryLikeRepository();

    const postOwner = await inMemoryUserRepository.create({
      name: 'owner',
      email: 'any_owner_email',
      password: 'any_password',
      username: 'any_owner_username',
    });

    post = await inMemoryPostRepository.create({
      userId: postOwner.id,
      content: 'any_data',
    });

    likeOnPostUseCase = new LikeOnPostUseCase(
      inMemoryLikeRepository,
      inMemoryUserRepository,
      inMemoryPostRepository,
    );

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_username',
    });
  });

  it('Should create a like on post correctly', async () => {
    const like = await likeOnPostUseCase.handle({
      userId: user.id,
      postId: post.id,
    });

    expect(like).toHaveProperty('id');
    expect(like.userId).toEqual(user.id);
  });

  it('Should throw an error if a param is invald', async () => {
    const data = {
      id: 'any_id',
      userId: user.id,
      postId: post.id,
    };
    await expect(likeOnPostUseCase.handle(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should throw an error if a param is missing', async () => {
    const data = {
      postId: post.id,
    };

    await expect(
      likeOnPostUseCase.handle(data as ICreateLikePostDTO),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete a like if user already have liked', async () => {
    const data = {
      userId: user.id,
      postId: post.id,
    };

    await likeOnPostUseCase.handle(data);

    await likeOnPostUseCase.handle(data);

    expect(await inMemoryLikeRepository.findByPostAndUserId(data)).toBeNull();
  });
});

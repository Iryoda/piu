import { inject, injectable } from 'tsyringe';
import Post from '@modules/post/domain/Post';
import IPostRepository from '@modules/post/repository/IPostRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import NotFound from '@shared/errors/NotFound';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';

@injectable()
export default class CreatePostUseCase {
  constructor(
    @inject('PostRepository') private postRepository: IPostRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async handle({
    userId,
    data: { content },
  }: ICreatePostDTO): Promise<Post> {
    const findUser = await this.userRepository.findOneById(userId);

    if (!findUser) throw new NotFound('User id');

    const post = await this.postRepository.create({
      data: { content },
      userId,
    });

    return post;
  }
}

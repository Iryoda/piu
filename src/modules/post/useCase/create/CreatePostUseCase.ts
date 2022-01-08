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

  public async handle(data: ICreatePostDTO): Promise<Post> {
    await Post.create(data.content);

    const findUser = await this.userRepository.findOneById(data.userId);

    if (!findUser) throw new NotFound('UserId');

    const post = await this.postRepository.create(data);

    return post;
  }
}

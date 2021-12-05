import Post from '@modules/post/domain/Post';
import IPostRepository from '@modules/post/repository/IPostRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class FindAllUseCase {
  constructor(
    @inject('PostRepository') private postRepository: IPostRepository,
  ) {}

  public async handle(): Promise<Post[]> {
    const posts = await this.postRepository.findByAll();
    return posts;
  }
}

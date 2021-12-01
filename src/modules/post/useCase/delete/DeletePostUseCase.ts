import IPostRepository from '@modules/post/repository/IPostRepository';
import InvalidParam from '@shared/errors/InvalidParamError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeletePostUseCase {
  constructor(
    @inject('PostRepository') private postRepository: IPostRepository,
  ) {}

  public async handle(id: string): Promise<void> {
    const findPost = await this.postRepository.findById(id);

    if (!findPost) throw new InvalidParam('Id');

    await this.postRepository.delete(id);
  }
}

import { inject, injectable } from 'tsyringe';
import Post from '@modules/post/domain/Post';
import IPostRepository from '@modules/post/repository/IPostRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import NotFound from '@shared/errors/NotFound';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';

@injectable()
export default class CreatePostUseCase {
  constructor(
    @inject('PostRepository') private postRepository: IPostRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  private checkIfParamIsValid(data: ICreatePostDTO): void {
    const validParam: Array<keyof ICreatePostDTO> = ['userId', 'content'];

    validParam.map((param) => {
      if (!data[param]) throw new MissingParam(param);
    });

    Object.keys(data).map((param) => {
      if (!validParam.includes(param as keyof ICreatePostDTO))
        throw new InvalidParam(param);
    });
  }

  public async handle(data: ICreatePostDTO): Promise<Post> {
    this.checkIfParamIsValid(data);

    const findUser = await this.userRepository.findOneById(data.userId);

    if (!findUser) throw new NotFound('UserId');

    const post = await this.postRepository.create(data);

    return post;
  }
}

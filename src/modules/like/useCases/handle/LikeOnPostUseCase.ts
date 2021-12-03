import ICreateLikePostDTO from '@modules/like/dtos/ICreateLikePostDTO';
import ILikeRepository from '@modules/like/repositories/ILikeRepository';
import IPostRepository from '@modules/post/repository/IPostRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import NotFound from '@shared/errors/NotFound';
import { Like } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';

type ValidParams = Array<keyof ICreateLikePostDTO>;

@injectable()
export default class LikeOnPostUseCase {
  constructor(
    @inject('LikeRepository') private likeRepository: ILikeRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('PostRepository') private postRepository: IPostRepository,
  ) {}

  private checkIfParamsAreValid(data: ICreateLikePostDTO) {
    const validParams: ValidParams = ['postId', 'userId'];

    validParams.map((param) => {
      if (!data[param]) throw new MissingParam(param);
    });

    Object.keys(data).map((param) => {
      if (!validParams.includes(param as keyof ICreateLikePostDTO))
        throw new InvalidParam(param);
    });
  }

  public async handle(data: ICreateLikePostDTO): Promise<Like> {
    this.checkIfParamsAreValid(data);

    const user = await this.userRepository.findOneById(data.userId);

    if (!user) throw new NotFound('User');

    const post = await this.postRepository.findById(data.postId);

    if (!post) throw new NotFound('Post');

    const findLike = await this.likeRepository.findByPostAndUserId(data);

    if (findLike) {
      await this.likeRepository.delete(findLike.id);
      return findLike;
    }

    return await this.likeRepository.create(data);
  }
}

import Comment from '@modules/comment/domain/Comment';
import ICreateCommentOnPost from '@modules/comment/dtos/ICreateCommentOnPost';
import ICommentRepository from '@modules/comment/repository/ICommentRepository';
import IPostRepository from '@modules/post/repository/IPostRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import NotFound from '@shared/errors/NotFound';

import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCommentOnPostUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('PostRepository') private postRepository: IPostRepository,
    @inject('CommentRepository') private commentRepository: ICommentRepository,
  ) {}

  private checkIfParamsAreValid(data: ICreateCommentOnPost) {
    const validParams: Array<keyof ICreateCommentOnPost> = [
      'postId',
      'userId',
      'content',
    ];

    validParams.map((param) => {
      if (!data[param]) throw new MissingParam(param);
    });

    Object.keys(data).map((param) => {
      if (!validParams.includes(param as keyof ICreateCommentOnPost))
        throw new InvalidParam(param);
    });
  }

  public async handle(data: ICreateCommentOnPost): Promise<Comment> {
    this.checkIfParamsAreValid(data);

    const user = await this.userRepository.findOneById(data.userId);

    if (!user) throw new NotFound('User id');

    const post = await this.postRepository.findById(data.postId);

    if (!post) throw new NotFound('Post id');

    const comment = await this.commentRepository.createOnPost(data);

    return comment;
  }
}

import ICreateResponse from '@modules/comment/dtos/ICreateResponse';
import ICommentRepository from '@modules/comment/repository/ICommentRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { Comment } from '@prisma/client';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import NotFound from '@shared/errors/NotFound';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateResponseUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('CommentRepository') private commentRepository: ICommentRepository,
  ) {}

  private checkIfParamsAreValid(data: ICreateResponse) {
    const validParams: Array<keyof ICreateResponse> = [
      'userId',
      'content',
      'commentId',
    ];

    validParams.map((param) => {
      if (!data[param]) throw new MissingParam(param);
    });

    Object.keys(data).map((param) => {
      if (!validParams.includes(param as keyof ICreateResponse))
        throw new InvalidParam(param);
    });
  }

  public async handle(data: ICreateResponse): Promise<Comment> {
    this.checkIfParamsAreValid(data);

    const user = await this.userRepository.findOneById(data.userId);

    if (!user) throw new NotFound('User');

    const comment = await this.commentRepository.findById(data.commentId);

    if (!comment) throw new NotFound('Comment');

    const response = await this.commentRepository.createResponse(data);

    return response;
  }
}

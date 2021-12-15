import Comment from '@modules/comment/domain/Comment';
import IUpdateComment from '@modules/comment/dtos/IUpdateComment';
import ICommentRepository from '@modules/comment/repository/ICommentRepository';
import InvalidParam from '@shared/errors/InvalidParamError';

import MissingParam from '@shared/errors/MissingParam';
import NotFound from '@shared/errors/NotFound';
import Unathorized from '@shared/errors/Unathorized';

import { inject, injectable } from 'tsyringe';

@injectable()
export default class UpdateCommentUseCase {
  constructor(
    @inject('CommentRepository') private commentRespository: ICommentRepository,
  ) {}

  public async handle(data: IUpdateComment): Promise<Comment> {
    this.checkIfParamsAreValid(data);

    const findComment = await this.commentRespository.findById(data.commentId);

    if (!findComment) throw new NotFound('Comment');

    if (findComment?.userId !== data.userId)
      throw new Unathorized('update this comment');

    const comment = await this.commentRespository.update(data);

    return comment;
  }

  private checkIfParamsAreValid(data: IUpdateComment): void {
    type ValidParams = keyof IUpdateComment;

    const validParams: ValidParams[] = ['commentId', 'userId', 'content'];

    validParams.map((param) => {
      if (!data[param]) throw new MissingParam(param);
    });

    Object.keys(data).map((key) => {
      if (!validParams.includes(key as ValidParams))
        throw new InvalidParam(key);
    });
  }
}

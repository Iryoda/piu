import IDeleteComment from '@modules/comment/dtos/IDeleteCommentUseCase';
import ICommentRepository from '@modules/comment/repository/ICommentRepository';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import NotFound from '@shared/errors/NotFound';
import Unathorized from '@shared/errors/Unathorized';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteCommentUseCase {
  constructor(
    @inject('CommentRepository') private commentRepository: ICommentRepository,
  ) {}

  private checkIfParamsAreValid(data: IDeleteComment): void {
    const validFields: Array<keyof IDeleteComment> = ['commentId', 'userId'];

    validFields.map((field) => {
      if (!data[field]) throw new MissingParam(field);
    });

    Object.keys(data).map((field) => {
      if (!validFields.includes(field as keyof IDeleteComment))
        throw new InvalidParam(field);
    });
  }

  public async handle(data: IDeleteComment): Promise<void> {
    this.checkIfParamsAreValid(data);

    const findComment = await this.commentRepository.findById(data.commentId);

    if (!findComment) throw new NotFound('Comment');

    if (findComment.userId !== data.userId)
      throw new Unathorized('delete this comment');

    await this.commentRepository.delete(data.commentId);
  }
}

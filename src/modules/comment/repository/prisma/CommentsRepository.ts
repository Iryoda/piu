import prisma from '@shared/prisma/client';
import Comment from '@modules/comment/domain/Comment';
import ICreateCommentOnPost from '@modules/comment/dtos/ICreateCommentOnPost';
import ICommentRepository from '../ICommentRepository';

export default class CommentsRepository implements ICommentRepository {
  private repository = prisma.comment;

  public async createOnPost(data: ICreateCommentOnPost): Promise<Comment> {
    const comment = await this.repository.create({ data: data });
    return comment;
  }
}

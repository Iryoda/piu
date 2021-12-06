import prisma from '@shared/prisma/client';
import Comment from '@modules/comment/domain/Comment';
import ICreateCommentOnPost from '@modules/comment/dtos/ICreateCommentOnPost';
import ICommentRepository from '../ICommentRepository';
import ICreateResponse from '@modules/comment/dtos/ICreateResponse';

export default class CommentsRepository implements ICommentRepository {
  private repository = prisma.comment;

  public async createOnPost(data: ICreateCommentOnPost): Promise<Comment> {
    const comment = await this.repository.create({ data: data });
    return comment;
  }

  public async createResponse(data: ICreateResponse): Promise<Comment> {
    const comment = await this.repository.create({ data: data });
    return comment;
  }

  public async findById(id: string): Promise<Comment | null> {
    const response = await this.repository.findFirst({ where: { id } });
    return response;
  }
}

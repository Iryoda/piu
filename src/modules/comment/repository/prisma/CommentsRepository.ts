import prisma from '@shared/prisma/client';
import Comment from '@modules/comment/domain/Comment';
import ICreateCommentOnPost from '@modules/comment/dtos/ICreateCommentOnPost';
import ICommentRepository from '../ICommentRepository';
import ICreateResponse from '@modules/comment/dtos/ICreateResponse';
import IUpdateComment from '@modules/comment/dtos/IUpdateComment';

export default class CommentsRepository implements ICommentRepository {
  private repository = prisma.comment;

  public async createOnPost(data: ICreateCommentOnPost): Promise<Comment> {
    const comment = await this.repository.create({ data: data });
    return comment;
  }

  public async update(data: IUpdateComment): Promise<Comment> {
    const newComment = await this.repository.update({
      where: { id: data.commentId },
      data: { content: data.content },
    });

    return newComment;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
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

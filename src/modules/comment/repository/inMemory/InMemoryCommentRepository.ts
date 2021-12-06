import Comment from '@modules/comment/domain/Comment';
import ICreateCommentOnPost from '@modules/comment/dtos/ICreateCommentOnPost';
import { v4 } from 'uuid';
import ICommentRepository from '../ICommentRepository';

export default class InMemoryCommentRepository implements ICommentRepository {
  private repository: Comment[] = [];

  public async createOnPost(data: ICreateCommentOnPost): Promise<Comment> {
    const comment = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    } as Comment;

    this.repository.push(comment);

    return comment;
  }
}

import Comment from '@modules/comment/domain/Comment';
import ICreateCommentOnPost from '@modules/comment/dtos/ICreateCommentOnPost';
import ICreateResponse from '@modules/comment/dtos/ICreateResponse';
import ICommentRepository from '../ICommentRepository';
import IUpdateComment from '@modules/comment/dtos/IUpdateComment';
import { v4 } from 'uuid';

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

  public async createResponse(data: ICreateResponse): Promise<Comment> {
    const comment = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    } as Comment;

    this.repository.push(comment);

    return comment;
  }

  public async delete(id: string): Promise<void> {
    this.repository.find((comment) => comment.id !== id);
  }

  public async update(data: IUpdateComment): Promise<Comment> {
    let newComment = {} as Comment;

    const newRepository = this.repository.map((comment) => {
      if (comment.id === data.commentId) {
        newComment = Object.assign(comment, { content: data.content });

        return newComment;
      }

      return comment;
    });

    this.repository = newRepository;

    return newComment;
  }

  public async findById(id: string): Promise<Comment | null> {
    const findComment = this.repository.find((comment) => comment.id === id);

    return findComment || null;
  }
}

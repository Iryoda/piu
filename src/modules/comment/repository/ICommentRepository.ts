import Comment from '../domain/Comment';
import ICreateCommentOnPost from '../dtos/ICreateCommentOnPost';
import ICreateResponse from '../dtos/ICreateResponse';

export default interface ICommentRepository {
  createOnPost(data: ICreateCommentOnPost): Promise<Comment>;
  createResponse(datea: ICreateResponse): Promise<Comment>;

  findById(id: string): Promise<Comment | null>;
}

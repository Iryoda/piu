import Comment from '../domain/Comment';
import ICreateCommentOnPost from '../dtos/ICreateCommentOnPost';
import ICreateResponse from '../dtos/ICreateResponse';
import IUpdateComment from '../dtos/IUpdateComment';

export default interface ICommentRepository {
  createOnPost(data: ICreateCommentOnPost): Promise<Comment>;
  createResponse(data: ICreateResponse): Promise<Comment>;
  delete(id: string): Promise<void>;
  update(data: IUpdateComment): Promise<Comment>;

  findById(id: string): Promise<Comment | null>;
}

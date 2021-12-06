import Comment from '../domain/Comment';
import ICreateCommentOnPost from '../dtos/ICreateCommentOnPost';

export default interface ICommentRepository {
  createOnPost(create: ICreateCommentOnPost): Promise<Comment>;
}

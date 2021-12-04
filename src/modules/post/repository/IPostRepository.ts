import Post from '../domain/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

export default interface IPostRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<Post | null>;
  findByAll(): Promise<Post[]>;
}

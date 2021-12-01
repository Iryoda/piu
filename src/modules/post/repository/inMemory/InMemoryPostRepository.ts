import Post from '@modules/post/domain/Post';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import { v4 } from 'uuid';
import IPostRepository from '../IPostRepository';

export default class InMemoryPostRepository implements IPostRepository {
  private repository: Post[] = [];

  public async create({ userId, data }: ICreatePostDTO): Promise<Post> {
    const newProfile: Post = {
      id: v4(),
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };

    this.repository.push(newProfile);

    return newProfile;
  }

  public async delete(id: string): Promise<void> {
    const newRepository = this.repository.filter((post) => post.id !== id);
    this.repository = newRepository;
  }

  public async findById(id: string): Promise<Post | null> {
    const post = this.repository.find((post) => post.id === id);
    return post || null;
  }
}

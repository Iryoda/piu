import Like from '@modules/like/domain/Like';
import ICreateLikePostDTO from '@modules/like/dtos/ICreateLikePostDTO';
import ILikeRepository from '../ILikeRepository';
import { v4 } from 'uuid';

export default class InMemoryLikeRepository implements ILikeRepository {
  private repository: Like[] = [];

  public async create(data: ICreateLikePostDTO): Promise<Like> {
    const newLike: Like = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      postId: data.postId,
      userId: data.userId,
    };

    this.repository.push(newLike);

    return newLike;
  }

  public async delete(id: string): Promise<void> {
    const newRepository = this.repository.filter((like) => like.id !== id);
    this.repository = newRepository;
  }

  public async findByPostAndUserId(
    data: ICreateLikePostDTO,
  ): Promise<Like | null> {
    const like = this.repository.find(
      (like) => like.userId === data.userId && like.postId === data.postId,
    );

    return like || null;
  }
}

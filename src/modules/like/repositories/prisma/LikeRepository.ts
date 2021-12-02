import prisma from '@shared/prisma/client';
import Like from '@modules/like/domain/Like';
import ICreateLikePostDTO from '@modules/like/dtos/ICreateLikePostDTO';
import ILikeRepository from '../ILikeRepository';

export default class LikeRepository implements ILikeRepository {
  private repository = prisma.like;

  public async create(data: ICreateLikePostDTO): Promise<Like> {
    const like = await this.repository.create({
      data: data,
    });

    return like;
  }
  public async delete(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
  }

  public async findByPostAndUserId(
    data: ICreateLikePostDTO,
  ): Promise<Like | null> {
    const like = await this.repository.findFirst({
      where: { postId: data.postId, userId: data.userId },
    });

    return like;
  }
}

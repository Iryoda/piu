import prisma from '@shared/prisma/client';
import IPostRepository from '../IPostRepository';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import Post from '@modules/post/domain/Post';

export default class PostRepository implements IPostRepository {
  private repository = prisma.post;

  public async create({ data, userId }: ICreatePostDTO): Promise<Post> {
    const post = await this.repository.create({
      data: { content: data.content, userId: userId },
    });

    return post;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Post | null> {
    const post = await this.repository.findFirst({ where: { id } });
    return post || null;
  }
}

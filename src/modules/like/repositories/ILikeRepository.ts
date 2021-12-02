import { Like } from '@prisma/client';
import ICreateLikePostDTO from '../dtos/ICreateLikePostDTO';

export default interface ILikeRepository {
  create(data: ICreateLikePostDTO): Promise<Like>;
  delete(id: string): Promise<void>;
  findByPostAndUserId(data: ICreateLikePostDTO): Promise<Like | null>;
}

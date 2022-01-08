import Comment from '@modules/comment/domain/Comment';
import User from '@modules/user/domain/User';
import { Post as PrismaPost } from '@prisma/client';
import AppError from '@shared/errors';
import * as yup from 'yup';

export default class Post implements PrismaPost {
  readonly id: string;
  readonly userId: string;
  readonly content: string;
  readonly user?: User;
  readonly comments?: Comment;
  readonly updatedAt: Date;
  readonly createdAt: Date;

  public static async create(content: string): Promise<void> {
    try {
      await yup.string().required().max(140).min(1).validate(content);
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        throw new AppError(e.message);
      }
    }
  }
}

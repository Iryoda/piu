import { Profile as PrismaProfile } from '@prisma/client';
import AppError from '@shared/errors';
import * as yup from 'yup';

export default class Profile implements PrismaProfile {
  id: string;
  about: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;

  public static async create(about: string): Promise<void> {
    try {
      await yup.string().max(140).min(1).validate(about);
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        throw new AppError(e.message);
      }
    }
  }
}

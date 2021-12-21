import { User as PrismaUser } from '@prisma/client';
import Profile from './Profile';

import * as yup from 'yup';
import { ValidationError } from 'yup';
import ICreateUser from '@modules/user/dtos/user/ICreateUser';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import AppError from '@shared/errors';

export default class User implements PrismaUser {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly profile?: Profile;

  static async create(data: ICreateUser): Promise<void | Error> {
    const schema = yup.object().shape({
      name: yup.string().required().max(40).min(4),
      username: yup.string().required().max(20).min(3),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });

    try {
      await schema.validate(data);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new AppError(e.message);
      }
    }
  }

  static async update(data: IUpdateUser): Promise<void | Error> {
    const schema = yup.object().shape({
      name: yup.string().max(40).min(4),
      username: yup.string().max(20).min(3),
    });

    try {
      await schema.validate(data);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new AppError(e.message);
      }
    }
  }
}

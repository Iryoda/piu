import prisma from '@shared/prisma/client';
import IUserRepository from '../IUserRepository';
import ICreateUser from '@modules/user/dtos/user/ICreateUser';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import User from '@modules/user/domain/User';

class UserRepository implements IUserRepository {
  public async create(data: ICreateUser): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
        profile: {
          create: {
            about: '',
          },
        },
      },
    });
    return user;
  }

  public async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  public async update(id: string, data: IUpdateUser): Promise<User> {
    const newUser = await prisma.user.update({ where: { id }, data });
    return newUser;
  }

  public async findOneById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    return user;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
      include: { profile: true },
    });
    return user;
  }

  public async findManyByName(name: string): Promise<User[] | null> {
    const user = await prisma.user.findMany({
      where: {
        name: { contains: name },
      },
      include: { profile: true },
    });
    return user;
  }

  public async findOneByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { username },
      include: { profile: true },
    });
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({ include: { profile: true } });
    return users;
  }
}

export default UserRepository;

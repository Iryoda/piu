import prisma from '@shared/prisma/client';
import IUserRepository from '../IUserRepository';
import ICreateUser from '@modules/user/dtos/user/ICreateUser';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import User from '@modules/user/domain/User';

const relation = {
  profile: true,
  post: true,
};

class UserRepository implements IUserRepository {
  private repository = prisma.user;

  public async create(data: ICreateUser): Promise<User> {
    const user = await this.repository.create({
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
    await this.repository.delete({ where: { id } });
  }

  public async update(id: string, data: IUpdateUser): Promise<User> {
    const newUser = await this.repository.update({ where: { id }, data });
    return newUser;
  }

  public async findOneById(id: string): Promise<User | null> {
    const user = await this.repository.findUnique({
      where: { id },
      include: { ...relation },
    });
    return user;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
      include: { ...relation },
    });
    return user;
  }

  public async findManyByName(name: string): Promise<User[] | null> {
    const user = await this.repository.findMany({
      where: {
        name: { contains: name },
      },
      include: { ...relation },
    });
    return user;
  }

  public async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.repository.findFirst({
      where: { username },
      include: { ...relation },
    });
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.repository.findMany({
      include: { profile: true },
    });
    return users;
  }
}

export default UserRepository;

import User from '@modules/user/domain/User';
import { v4 } from 'uuid';
import IUserRepository from '../IUserRepository';
import ICreateUser from '@modules/user/dtos/user/ICreateUser';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';

export default class InMemoryUserRepository implements IUserRepository {
  private repository: User[] = [];

  public async create(data: ICreateUser): Promise<User> {
    const userId = v4();

    const user: User = {
      ...data,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: v4(),
        about: '',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    this.repository.push(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    const newArray = this.repository.filter((user) => user.id !== id);
    this.repository = newArray;
  }

  public async update(id: string, data: IUpdateUser): Promise<User> {
    const user = this.repository.find((user) => user.id === id)!;

    const newUser = Object.assign(user, { ...data });

    const newArray = this.repository.map((user) => {
      if (user.id === id) {
        return newUser;
      }

      return user;
    });

    this.repository = newArray;

    return user;
  }

  public async findOneById(id: string): Promise<User | null> {
    const user = this.repository.find((user) => user.id === id);

    return user || null;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = this.repository.find((user) => user.email === email);

    return user || null;
  }

  public async findManyByName(name: string): Promise<User[] | null> {
    const user = this.repository.filter((user) => user.name === name);

    return user || null;
  }

  public async findOneByUsername(username: string): Promise<User | null> {
    const user = this.repository.find((user) => user.username === username);
    return user || null;
  }

  public async findAll(): Promise<User[]> {
    return this.repository;
  }

  public async findOneByIdWithRelations(id: string): Promise<User | null> {
    const user = this.repository.find((user) => user.id === id);
    return user || null;
  }
}

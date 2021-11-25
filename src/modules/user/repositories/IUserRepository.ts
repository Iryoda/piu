import User from '../domain/User';
import ICreateUser from '../dtos/user/ICreateUser';
import IUpdateUser from '../dtos/user/IUpdateUser';

export default interface IUserRepository {
  create(data: ICreateUser): Promise<User>;
  delete(id: string): Promise<void>;
  update(id: string, data: IUpdateUser): Promise<User>;

  findAll(): Promise<User[]>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneByUsername(username: string): Promise<User | null>;
  findManyByName(name: string): Promise<User[] | null>;
}

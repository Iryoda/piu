import { inject, injectable } from 'tsyringe';
import ICreateUser from '../../dtos/user/ICreateUser';
import IUserRepository from '../../repositories/IUserRepository';
import ShouldBeUnique from '@shared/errors/ShouldBeUnique';

import User from '@modules/user/domain/User';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async handle(data: ICreateUser): Promise<User> {
    await User.create(data);

    const findUserByEmail = await this.userRepository.findOneByEmail(
      data.email,
    );

    if (findUserByEmail) throw new ShouldBeUnique('Email');

    const findUserByUsername = await this.userRepository.findOneByUsername(
      data.username,
    );

    if (findUserByUsername) throw new ShouldBeUnique('Username');

    const newPassword = await this.hashProvider.generateHash(data.password);

    const user = this.userRepository.create(
      Object.assign(data, {
        password: newPassword,
      }),
    );

    return user;
  }
}

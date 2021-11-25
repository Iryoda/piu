import { inject, injectable } from 'tsyringe';
import ICreateUser from '../../dtos/user/ICreateUser';
import IUserRepository from '../../repositories/IUserRepository';
import MissingParam from '@shared/errors/MissingParam';
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
    const { email, name, password, username } = data;

    const findUserByEmail = await this.userRepository.findOneByEmail(
      data.email,
    );

    if (findUserByEmail) throw new ShouldBeUnique('Email');

    const findUserByUsername = await this.userRepository.findOneByUsername(
      data.username,
    );

    if (findUserByUsername) throw new ShouldBeUnique('Username');

    const mandatoryField = ['username', 'email', 'name', 'password'];

    mandatoryField.map((field) => {
      //@ts-ignore
      if (!data[field]) throw new MissingParam(field);
    });

    const newPassword = await this.hashProvider.generateHash(password);

    const user = this.userRepository.create({
      username,
      name,
      email: email.toLowerCase(),
      password: newPassword,
    });

    return user;
  }
}

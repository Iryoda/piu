import { inject, injectable } from 'tsyringe';
import NotFound from '@shared/errors/NotFound';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/domain/User';
import ShouldBeUnique from '@shared/errors/ShouldBeUnique';

interface UpdateUserData {
  id: string;
  data: IUpdateUser;
}

@injectable()
export default class UpdateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async handle({ id, data }: UpdateUserData): Promise<User> {
    await User.update(data);

    const findUser = await this.userRepository.findOneById(id);

    if (!findUser) throw new NotFound('User');

    if (data.username) {
      const findUserByUsername = await this.userRepository.findOneByUsername(
        data.username,
      );
      if (findUserByUsername) throw new ShouldBeUnique(data.username);
    }

    const updatedUser = await this.userRepository.update(id, data);

    return updatedUser;
  }
}

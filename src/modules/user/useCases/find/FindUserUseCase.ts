import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import NotFound from '@shared/errors/NotFound';
import User from '@modules/user/domain/User';

@injectable()
export default class FindUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFound('User');
    }

    return user;
  }

  public async findAll(): Promise<User[]> {
    const user = await this.userRepository.findAll();
    return user;
  }
}

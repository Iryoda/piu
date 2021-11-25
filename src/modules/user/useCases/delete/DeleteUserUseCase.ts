import IUserRepository from '@modules/user/repositories/IUserRepository';
import NotFound from '@shared/errors/NotFound';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async deleteById(id: string): Promise<void> {
    const findUser = await this.userRepository.findOneById(id);

    if (!findUser) throw new NotFound('User');

    await this.userRepository.delete(id);
  }
}

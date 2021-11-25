import { inject, injectable } from 'tsyringe';
import InvalidParam from '@shared/errors/InvalidParamError';
import NotFound from '@shared/errors/NotFound';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/domain/User';

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
    const findUser = await this.userRepository.findOneById(id);

    if (!findUser) throw new NotFound('User');

    const validField = ['name', 'username'];

    Object.keys(data).map((field) => {
      if (!validField) throw new InvalidParam(field);
    });

    const updatedUser = await this.userRepository.update(id, data);

    return updatedUser;
  }
}

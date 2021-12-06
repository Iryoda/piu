import { inject, injectable } from 'tsyringe';
import InvalidParam from '@shared/errors/InvalidParamError';
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

  private checkIfParamsAreValid(data: IUpdateUser): void {
    const validField: Array<keyof IUpdateUser> = ['name', 'username'];

    Object.keys(data).map((param) => {
      if (!validField.includes(param as keyof IUpdateUser))
        throw new InvalidParam(param);
    });
  }

  public async handle({ id, data }: UpdateUserData): Promise<User> {
    this.checkIfParamsAreValid(data);

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

import Profile from '@modules/user/domain/Profile';
import IUpdateProfile from '@modules/user/dtos/profile/IUpdateProfile';
import IProfileRepository from '@modules/user/repositories/in-memory/InMemoryProfileRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/errors';
import InvalidParam from '@shared/errors/InvalidParamError';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  userId: string;
  data: IUpdateProfile;
};

@injectable()
export default class UpdateProfileUseCase {
  constructor(
    @inject('ProfileRepository') private profileRepository: IProfileRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async handle({ userId, data: { about } }: IRequest): Promise<Profile> {
    const findUser = await this.userRepository.findOneById(userId);

    await Profile.create(about);

    if (!findUser) throw new InvalidParam('User id');

    const profileId = findUser.profile?.id;

    if (!profileId) throw new AppError('Profile Id is invalid', 500);

    const data = { about };

    const updatedProfile = await this.profileRepository.update(profileId, data);

    return updatedProfile;
  }
}

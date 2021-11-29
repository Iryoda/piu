import Profile from '@modules/user/domain/Profile';
import User from '@modules/user/domain/User';
import InMemoryProfileRepository from '@modules/user/repositories/in-memory/InMemoryProfileRepository';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import AppError from '@shared/errors';
import UpdateProfileUseCase from './UpdateProfileUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryProfileRepository: InMemoryProfileRepository;
let updateProfileUseCase: UpdateProfileUseCase;
let user: User;
let profile: Profile;

describe('UpdateProfileUseCase', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProfileRepository = new InMemoryProfileRepository();

    updateProfileUseCase = new UpdateProfileUseCase(
      inMemoryProfileRepository,
      inMemoryUserRepository,
    );

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      username: 'any_username',
    });

    profile = await inMemoryProfileRepository.create({
      about: 'any_about',
      userId: user.id,
    });

    Object.assign(user, { ...user, profile: profile });
  });

  it('Should update correctly', async () => {
    const newInfo = { about: 'any_about' };

    const newProfile = await updateProfileUseCase.handle({
      userId: user.id,
      data: newInfo,
    });

    expect(newProfile.about).toEqual('any_about');
  });

  it('Should throw 400 if user id is invalid', async () => {
    const newInfo = { about: 'any_about' };

    await expect(
      updateProfileUseCase.handle({ userId: 'any_id2', data: newInfo }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

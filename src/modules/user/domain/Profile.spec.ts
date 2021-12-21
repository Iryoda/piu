import AppError from '@shared/errors';
import Profile from './Profile';

describe('Profile', () => {
  it('Should not create profile if about is bigger than 140', () => {
    expect(
      Profile.create(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create profile if about is smaller than 1', () => {
    expect(Profile.create('')).rejects.toBeInstanceOf(AppError);
  });
});

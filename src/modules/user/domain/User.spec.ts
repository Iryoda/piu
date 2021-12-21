import AppError from '@shared/errors';
import User from './User';

let createUser = {
  name: 'any_name',
  username: 'any_username',
  email: 'any_email@mail.com',
  password: 'any_password',
};

let updateUser = {
  name: 'any_name',
  username: 'any_username',
};

describe('User.create', () => {
  it('Should throw an error if email is not a string', async () => {
    await expect(
      User.create(Object.assign(createUser, { email: 11 })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw an error if email is invalid', async () => {
    await expect(
      User.create(Object.assign(createUser, { email: 'invalid@email..com' })),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      User.create(Object.assign(createUser, { email: 'invalid_email.com' })),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      User.create(Object.assign(createUser, { email: '@invalid_email.com' })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if name is not a string', async () => {
    await expect(
      User.create(Object.assign(createUser, { name: 0 })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if name is smaller than 4 letters', async () => {
    await expect(
      User.create(Object.assign(createUser, { name: 'egg' })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if name is bigger than 40 letters', async () => {
    await expect(
      User.create(
        Object.assign(createUser, {
          name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if username is is not a string', async () => {
    await expect(
      User.create(
        Object.assign(createUser, {
          username: 11,
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if username is smaller than 3 letters', async () => {
    await expect(
      User.create(
        Object.assign(createUser, {
          username: 'eg',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if username is bigger than 20 letters', async () => {
    await expect(
      User.create(
        Object.assign(createUser, {
          username:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if password is is not a string', async () => {
    await expect(
      User.create(
        Object.assign(createUser, {
          username: 11,
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if password is smaller than 8 letters', async () => {
    await expect(
      User.create(
        Object.assign(createUser, {
          password: 'invalid_',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});

describe('User.update', () => {
  it('Should trown an error if name is not a string', async () => {
    await expect(
      User.update(Object.assign(updateUser, { name: 0 })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if name is smaller than 4 letters', async () => {
    await expect(
      User.update(Object.assign(updateUser, { name: 'egg' })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if name is bigger than 40 letters', async () => {
    await expect(
      User.update(
        Object.assign(updateUser, {
          name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if username is is not a string', async () => {
    await expect(
      User.update(
        Object.assign(updateUser, {
          username: 11,
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if username is smaller than 3 letters', async () => {
    await expect(
      User.update(
        Object.assign(updateUser, {
          username: 'eg',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should trown an error if username is bigger than 20 letters', async () => {
    await expect(
      User.update(
        Object.assign(updateUser, {
          username:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});

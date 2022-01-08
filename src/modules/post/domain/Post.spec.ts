import AppError from '@shared/errors';
import Post from './Post';

describe('Post', () => {
  it('Should not create a post if about is null', async () => {
    await expect(Post.create('')).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create a post if about is larger than 400', async () => {
    await expect(
      Post.create(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import Post from '@modules/post/domain/Post';
import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import InvalidParam from '@shared/errors/InvalidParamError';
import DeletePostUseCase from './DeletePostUseCase';

let inMemoryPostRepository: InMemoryPostRepository;
let deletePostUseCase: DeletePostUseCase;
let post: Post;

describe('DeletePostUseCase', () => {
  beforeEach(async () => {
    inMemoryPostRepository = new InMemoryPostRepository();
    deletePostUseCase = new DeletePostUseCase(inMemoryPostRepository);

    post = await inMemoryPostRepository.create({
      userId: 'any_id',
      data: {
        content: 'any_content',
      },
    });
  });

  it('Should throw error post if id does not exist', async () => {
    await expect(deletePostUseCase.handle('wrong_id')).rejects.toBeInstanceOf(
      InvalidParam,
    );
  });

  it('Should delete post correctly', async () => {
    await deletePostUseCase.handle(post.id);
    await expect(inMemoryPostRepository.findById(post.id)).resolves.toBeNull();
  });
});

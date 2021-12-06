import Post from '@modules/post/domain/Post';
import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import FindAllUseCase from './FindAllUseCase';

let inMemoryPostRepository: InMemoryPostRepository;
let findAllUseCase: FindAllUseCase;
let post: Post;
let post2: Post;

describe('FindAllUseCase', () => {
  beforeEach(async () => {
    inMemoryPostRepository = new InMemoryPostRepository();
    findAllUseCase = new FindAllUseCase(inMemoryPostRepository);

    post = await inMemoryPostRepository.create({
      content: 'any_content',
      userId: 'any_id',
    });

    post2 = await inMemoryPostRepository.create({
      content: 'any_content2',
      userId: 'any_id',
    });
  });

  it('Should return all post correctly', async () => {
    const posts = await findAllUseCase.handle();

    expect(posts).toHaveLength(2);

    expect(posts).toContain(post);
    expect(posts).toContain(post2);
  });
});

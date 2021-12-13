import Comment from '@modules/comment/domain/Comment';
import IDeleteComment from '@modules/comment/dtos/IDeleteCommentUseCase';
import InMemoryCommentRepository from '@modules/comment/repository/inMemory/InMemoryCommentRepository';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import DeleteCommentUseCase from './DeleteCommentUseCase';
import { v4 } from 'uuid';

let inMemoryCommentRepository: InMemoryCommentRepository;
let deleteCommentUseCase: DeleteCommentUseCase;
let comment: Comment;
const userId = v4();
const postId = v4();

describe('DeleteCommentUseCase', () => {
  beforeEach(async () => {
    inMemoryCommentRepository = new InMemoryCommentRepository();
    deleteCommentUseCase = new DeleteCommentUseCase(inMemoryCommentRepository);

    comment = await inMemoryCommentRepository.createOnPost({
      userId,
      postId,
      content: 'any_content',
    });
  });

  it('Should delete comment correctly', async () => {
    expect(await deleteCommentUseCase.handle({ userId, commentId: comment.id }))
      .resolves;
  });

  it('Should throw an error if a param is missing', async () => {
    const data = {
      commentId: comment.id,
    } as IDeleteComment;

    await expect(deleteCommentUseCase.handle(data)).rejects.toBeInstanceOf(
      MissingParam,
    );
  });

  it('Should throw an error if a param is invalid', async () => {
    const data = {
      commentId: comment.id,
      userId,
      invalidParam: 'invalid_param',
    } as IDeleteComment;

    await expect(deleteCommentUseCase.handle(data)).rejects.toBeInstanceOf(
      InvalidParam,
    );
  });
});

import Comment from '@modules/comment/domain/Comment';
import InMemoryCommentRepository from '@modules/comment/repository/inMemory/InMemoryCommentRepository';
import UpdateCommentUseCase from './UpdateCommentUseCase';
import { v4 } from 'uuid';
import InvalidParam from '@shared/errors/InvalidParamError';
import IUpdateComment from '@modules/comment/dtos/IUpdateComment';
import MissingParam from '@shared/errors/MissingParam';
import Unathorized from '@shared/errors/Unathorized';
import NotFound from '@shared/errors/NotFound';

let inMemoryCommentRepository: InMemoryCommentRepository;
let updateCommentUseCase: UpdateCommentUseCase;
let comment: Comment;
const userId = v4();
const postId = v4();

describe('UpdateCommentUseCase', () => {
  beforeEach(async () => {
    inMemoryCommentRepository = new InMemoryCommentRepository();

    updateCommentUseCase = new UpdateCommentUseCase(inMemoryCommentRepository);

    comment = await inMemoryCommentRepository.createOnPost({
      postId,
      userId,
      content: 'any_content',
    });
  });

  it('Should update a comment correctly', async () => {
    const data = {
      userId,
      commentId: comment.id,
      content: 'updated_content',
    };

    const updatedComment = await updateCommentUseCase.handle(data);

    expect(updatedComment.content).toEqual('updated_content');
  });

  it('Should trown an error if params are invalid', async () => {
    const data = {
      userId,
      commentId: comment.id,
      content: 'updated_content',
      invalidParam: 'invalid_param',
    };

    await expect(updateCommentUseCase.handle(data)).rejects.toBeInstanceOf(
      InvalidParam,
    );
  });

  it('Should trown an error if a param is missing', async () => {
    const data = {
      userId,
      commentId: comment.id,
    } as IUpdateComment;

    await expect(updateCommentUseCase.handle(data)).rejects.toBeInstanceOf(
      MissingParam,
    );
  });

  it('Should trown an error if userId is invalid', async () => {
    const data = {
      userId: 'invalid_userId',
      commentId: comment.id,
      content: 'updated_content',
    } as IUpdateComment;

    await expect(updateCommentUseCase.handle(data)).rejects.toBeInstanceOf(
      Unathorized,
    );
  });

  it('Should trown an error if commentId is invalid', async () => {
    const data = {
      userId,
      commentId: 'invalid_commentId',
      content: 'updated_content',
    } as IUpdateComment;

    await expect(updateCommentUseCase.handle(data)).rejects.toBeInstanceOf(
      NotFound,
    );
  });
});

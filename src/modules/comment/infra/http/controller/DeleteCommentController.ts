import DeleteCommentUseCase from '@modules/comment/useCase/delete/DeleteCommentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeleteCommentController {
  public async handle(res: Response, req: Request): Promise<Response> {
    const data = req.body;

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    await deleteCommentUseCase.handle(data);

    return res.status(200).send({ msg: 'Comment was deleted successfully' });
  }
}

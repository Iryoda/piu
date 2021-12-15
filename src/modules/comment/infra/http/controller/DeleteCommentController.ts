import DeleteCommentUseCase from '@modules/comment/useCase/delete/DeleteCommentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeleteCommentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const data = req.body;

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    await deleteCommentUseCase.handle({ commentId, ...data });

    return res.status(200).send({ msg: 'Comment was deleted successfully' });
  }
}

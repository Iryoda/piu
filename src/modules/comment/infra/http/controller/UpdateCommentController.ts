import UpdateCommentUseCase from '@modules/comment/useCase/update/UpdateCommentUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UpdateCommentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const data = req.body;

    const updateCommentUseCase = container.resolve(UpdateCommentUseCase);

    const comment = updateCommentUseCase.handle({ commentId, ...data });

    return res.status(200).json(comment);
  }
}

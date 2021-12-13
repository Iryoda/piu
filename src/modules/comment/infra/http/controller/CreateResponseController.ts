import CreateResponseUseCase from '@modules/comment/useCase/create/CreateResponseUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateResponseController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const data = req.body;

    const createResponseUseCase = container.resolve(CreateResponseUseCase);

    const response = await createResponseUseCase.handle({ commentId, ...data });

    return res.status(201).json(response);
  }
}

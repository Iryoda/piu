import CreateCommentOnPostUseCase from '@modules/comment/useCase/create/CreateCommentOnPostUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateCommentOnPostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const createCommentOnPostUseCase = container.resolve(
      CreateCommentOnPostUseCase,
    );

    const response = await createCommentOnPostUseCase.handle(data);

    return res.status(201).json(response);
  }
}

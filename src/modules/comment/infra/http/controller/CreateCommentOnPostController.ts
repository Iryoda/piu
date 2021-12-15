import CreateCommentOnPostUseCase from '@modules/comment/useCase/create/CreateCommentOnPostUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreateCommentOnPostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    const data = req.body;

    const createCommentOnPostUseCase = container.resolve(
      CreateCommentOnPostUseCase,
    );

    const response = await createCommentOnPostUseCase.handle({
      postId,
      ...data,
    });

    return res.status(201).json(response);
  }
}

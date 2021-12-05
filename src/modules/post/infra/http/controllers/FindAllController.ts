import FindAllUseCase from '@modules/post/useCase/find/FindAllUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FindAllController {
  public async handle(_req: Request, res: Response): Promise<Response> {
    const findAllUseCase = container.resolve(FindAllUseCase);

    const posts = await findAllUseCase.handle();

    return res.status(200).json(posts);
  }
}

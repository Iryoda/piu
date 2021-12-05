import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import CreatePostUseCase from '@modules/post/useCase/create/CreatePostUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreatePostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId, data }: ICreatePostDTO = req.body;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const profile = await createPostUseCase.handle({ userId, data });

    return res.status(200).json(profile);
  }
}

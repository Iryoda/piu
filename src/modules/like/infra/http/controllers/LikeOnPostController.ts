import { Request, Response } from 'express';
import ICreateLikePostDTO from '@modules/like/dtos/ICreateLikePostDTO';
import LikeOnPostUseCase from '@modules/like/useCases/handle/LikeOnPostUseCase';
import { container } from 'tsyringe';

export default class LikeOnPostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId, postId }: ICreateLikePostDTO = req.body;

    const likenOnPostUseCase = container.resolve(LikeOnPostUseCase);

    const like = await likenOnPostUseCase.handle({ postId, userId });

    return res.status(201).json(like);
  }
}

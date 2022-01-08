import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import CreatePostUseCase from '@modules/post/useCase/create/CreatePostUseCase';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CreatePostController {
  private checkIfParamIsValid(data: ICreatePostDTO): void {
    const validParam: Array<keyof ICreatePostDTO> = ['userId', 'content'];

    validParam.map((param) => {
      if (!data[param]) throw new MissingParam(param);
    });

    Object.keys(data).map((param) => {
      if (!validParam.includes(param as keyof ICreatePostDTO))
        throw new InvalidParam(param);
    });
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const data: ICreatePostDTO = req.body;

    this.checkIfParamIsValid(data);

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const profile = await createPostUseCase.handle(data);

    return res.status(201).json(profile);
  }
}

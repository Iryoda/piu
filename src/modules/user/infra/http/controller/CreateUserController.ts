import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ICreateUser from '@modules/user/dtos/user/ICreateUser';
import CreateUserUseCase from '@modules/user/useCases/create/CreateUserUseCase';

export default class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const data: ICreateUser = req.body;

    const createUserService = container.resolve(CreateUserUseCase);

    const user = await createUserService.handle(data);

    return res.status(201).json(user);
  }
}

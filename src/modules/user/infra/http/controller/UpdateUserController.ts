import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import UpdateUserUseCase from '@modules/user/useCases/update/UpdateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UpdateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { username, name }: IUpdateUser = req.body;

    const data = { username, name };

    const updateUserService = container.resolve(UpdateUserUseCase);

    const user = await updateUserService.handle({ id, data });

    return res.status(200).json(user);
  }
}

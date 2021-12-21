import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindUserService from '@modules/user/useCases/find/FindUserUseCase';

export default class FindUserController {
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUserService = container.resolve(FindUserService);

    const user = await findUserService.findOneById(id);

    return res.status(200).json(user);
  }

  public async findAll(_: Request, res: Response): Promise<Response> {
    const findUserService = container.resolve(FindUserService);

    const users = await findUserService.findAll();
    return res.status(200).json(users);
  }
}

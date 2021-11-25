import { container } from 'tsyringe';
import DeleteUserUseCase from '@modules/user/useCases/delete/DeleteUserUseCase';
import { Request, Response } from 'express';

export default class DeleteUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserService = container.resolve(DeleteUserUseCase);

    const user = await deleteUserService.deleteById(id);

    return res.status(200).json(user);
  }
}

import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';
import UpdateUserUseCase from '@modules/user/useCases/update/UpdateUserUseCase';
import InvalidParam from '@shared/errors/InvalidParamError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UpdateUserController {
  private checkIfParamsAreValid(data: IUpdateUser): void {
    const validField: Array<keyof IUpdateUser> = ['name', 'username'];

    Object.keys(data).map((param) => {
      if (!validField.includes(param as keyof IUpdateUser))
        throw new InvalidParam(param);
    });

    console.log(data);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const { username, name }: IUpdateUser = req.body;

    const data = { username, name };

    this.checkIfParamsAreValid(data);

    const updateUserService = container.resolve(UpdateUserUseCase);

    const user = await updateUserService.handle({ id: userId, data });

    return res.status(200).json(user);
  }
}

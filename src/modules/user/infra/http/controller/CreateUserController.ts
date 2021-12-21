import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ICreateUser from '@modules/user/dtos/user/ICreateUser';
import CreateUserUseCase from '@modules/user/useCases/create/CreateUserUseCase';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';

export default class CreateUserController {
  private checkIfParamsAreValid(data: ICreateUser): void {
    const validParams: Array<keyof ICreateUser> = [
      'username',
      'email',
      'name',
      'password',
    ];

    validParams.map((field) => {
      if (!data[field]) throw new MissingParam(field);
    });

    Object.keys(data).map((param) => {
      if (!validParams.includes(param as keyof ICreateUser))
        throw new InvalidParam(param);
    });
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const data: ICreateUser = req.body;

    this.checkIfParamsAreValid(data);

    const createUserService = container.resolve(CreateUserUseCase);

    const user = await createUserService.handle(data);

    return res.status(201).json(user);
  }
}

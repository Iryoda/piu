import UpdateProfileUseCase from '@modules/user/useCases/update/UpdateProfileUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UpdateProfileController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const { about } = req.body;

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

    const user = await updateProfileUseCase.handle({ userId, data: { about } });

    return res.status(200).json(user);
  }
}

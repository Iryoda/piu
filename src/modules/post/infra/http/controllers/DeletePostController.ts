import DeletePostUseCase from '@modules/post/useCase/delete/DeletePostUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeletePostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    const post = await deletePostUseCase.handle(postId);

    return res.status(200).json({ msg: 'Post deleted succesfully' });
  }
}

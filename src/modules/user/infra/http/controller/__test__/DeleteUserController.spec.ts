import { Request, Response } from 'express';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import DeleteUserController from '../DeleteUserController';
import { container } from 'tsyringe';
import mockResponse from '@shared/mocks/ResponseMock';
import { User } from '@prisma/client';

let deleteUserController: DeleteUserController;
let inMemoryUserRepository: InMemoryUserRepository;
let user: User;
let response: Response;

describe('DeleteUserController', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();

    container.registerInstance('UserRepository', inMemoryUserRepository);

    deleteUserController = new DeleteUserController();

    user = await inMemoryUserRepository.create({
      email: 'any_email@mail.com',
      name: 'any_name',
      username: 'any_username',
      password: 'any_password',
    });

    response = mockResponse();
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('Should send a repsonse with status code 200', async () => {
    const request = {
      params: { id: user.id } as any,
    } as Request;

    await deleteUserController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith('');

    expect(await inMemoryUserRepository.findOneById(user.id)).toBeNull();
  });
});

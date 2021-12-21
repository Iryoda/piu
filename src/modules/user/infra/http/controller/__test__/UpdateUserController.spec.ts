import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { container } from 'tsyringe';
import mockResponse from '@shared/mocks/ResponseMock';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import UpdateUserController from '../UpdateUserController';
import IUpdateUser from '@modules/user/dtos/user/IUpdateUser';

let updateUserController: UpdateUserController;
let inMemoryUserRepository: InMemoryUserRepository;
let user: User;
let response: Response;

describe('DeleteUserController', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();

    container.registerInstance('UserRepository', inMemoryUserRepository);

    updateUserController = new UpdateUserController();

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

  it('Should send a repsonse with status code 200 if a valid name passed', async () => {
    const request = {
      params: { userId: user.id } as any,
      body: {
        name: 'any_name2',
      } as IUpdateUser,
    } as Request;

    await updateUserController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalled();
  });

  it('Should send a repsonse with status code 200 if a valid username passed', async () => {
    const request = {
      params: { userId: user.id } as any,
      body: {
        username: 'any_username2',
      } as IUpdateUser,
    } as Request;

    await updateUserController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalled();
  });
});

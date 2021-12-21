import { Request, Response } from 'express';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import FindUserController from '../FindUserController';
import { container } from 'tsyringe';
import mockResponse from '@shared/mocks/ResponseMock';
import { User } from '@prisma/client';
import NotFound from '@shared/errors/NotFound';

let findUserController: FindUserController;
let inMemoryUserRepository: InMemoryUserRepository;
let user: User;
let response: Response;

describe('FindUserController/findById', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();

    container.registerInstance('UserRepository', inMemoryUserRepository);

    findUserController = new FindUserController();

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

  it('Should send a response with status code 200', async () => {
    const request = {
      params: { id: user.id } as any,
    } as Request;

    await findUserController.findById(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(user);
  });

  it('Should send a repsonse with status code 400 if user is not found', async () => {
    const request = {
      params: { id: 'any_id' } as any,
    } as Request;

    await expect(
      findUserController.findById(request, response),
    ).rejects.toBeInstanceOf(NotFound);

    expect(response.status).not.toHaveBeenCalled();
  });
});

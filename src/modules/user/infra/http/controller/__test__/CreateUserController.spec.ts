import { Request, Response } from 'express';
import { container } from 'tsyringe';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import CreateUserController from '../CreateUserController';
import mockResponse from '@shared/mocks/ResponseMock';

import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';

let createUserController: CreateUserController;
let response: Response;

describe('CreateUserController', () => {
  beforeEach(() => {
    container.registerInstance('UserRepository', new InMemoryUserRepository());
    container.registerInstance('HashProvider', new HashProvider());

    createUserController = new CreateUserController();

    response = mockResponse();
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('Should throw a invalid param error if a param is invalid', async () => {
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        username: 'any_username',
        invalid_param: 'invalid_param',
      },
    } as Request;

    await expect(
      createUserController.handle(request, response),
    ).rejects.toBeInstanceOf(InvalidParam);
  });

  it('Should throw a invalid param error if a param is invalid', async () => {
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        username: 'any_username',
        invalid_param: 'invalid_param',
      },
    } as Request;

    await expect(
      createUserController.handle(request, response),
    ).rejects.toBeInstanceOf(InvalidParam);
  });

  it('Should throw a missing param error if username is missing', async () => {
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    } as Request;

    await expect(
      createUserController.handle(request, response),
    ).rejects.toEqual(new MissingParam('username'));
  });

  it('Should throw a missing param error if password is missing', async () => {
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        username: 'any_username',
      },
    } as Request;

    await expect(
      createUserController.handle(request, response),
    ).rejects.toEqual(new MissingParam('password'));
  });

  it('Should throw a missing param error if a email is missing', async () => {
    const request = {
      body: {
        name: 'any_name',
        password: 'any_password',
        username: 'any_username',
      },
    } as Request;

    await expect(
      createUserController.handle(request, response),
    ).rejects.toEqual(new MissingParam('email'));
  });

  it('Should throw a missing param error if name is missing', async () => {
    const request = {
      body: {
        password: 'any_password',
        email: 'any_email@mail.com',
        username: 'any_username',
      },
    } as Request;

    await expect(
      createUserController.handle(request, response),
    ).rejects.toEqual(new MissingParam('name'));
  });

  it('Should return status 201 if params are valid', async () => {
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        username: 'any_username',
      },
    } as Request;

    await createUserController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalled();
  });
});

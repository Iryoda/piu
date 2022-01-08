import { Request, Response } from 'express';
import InMemoryPostRepository from '@modules/post/repository/inMemory/InMemoryPostRepository';
import InMemoryUserRepository from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import CreatePostController from '../CreatePostController';
import { container } from 'tsyringe';
import mockResponse from '@shared/mocks/ResponseMock';
import InvalidParam from '@shared/errors/InvalidParamError';
import MissingParam from '@shared/errors/MissingParam';
import { User } from '@prisma/client';

let createPostController: CreatePostController;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let response: Response;
let user: User;

describe('CreatePostController', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryPostRepository = new InMemoryPostRepository();

    container.registerInstance('PostRepository', inMemoryPostRepository);
    container.registerInstance('UserRepository', inMemoryUserRepository);

    createPostController = new CreatePostController();

    response = mockResponse();

    user = await inMemoryUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      username: 'any_username',
    });
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('Should throw an error if a invalid param is passed', async () => {
    const data = {
      userId: 'any_id',
      content: 'any_content',
      invalidParam: 'invalid_param',
    };

    const request = {
      body: {
        ...data,
      },
    } as Request;

    await expect(
      createPostController.handle(request, response),
    ).rejects.toBeInstanceOf(InvalidParam);
  });

  it('Should throw an error if a missing a param', async () => {
    const data = {
      userId: 'any_id',
    };

    const request = {
      body: {
        ...data,
      },
    } as Request;

    await expect(
      createPostController.handle(request, response),
    ).rejects.toBeInstanceOf(MissingParam);
  });

  it('Should return a response with status 201', async () => {
    const data = {
      userId: user.id,
      content: 'any_content',
    };

    const request = {
      body: {
        ...data,
      },
    } as Request;

    await createPostController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.status).toHaveBeenCalled();
  });
});

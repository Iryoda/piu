import { container } from 'tsyringe';
import './providers';

import UserRepository from '../../modules/user/repositories/prisma/UserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import IProfileRepository from '@modules/user/repositories/in-memory/InMemoryProfileRepository';
import ProfileRepository from '@modules/user/repositories/prisma/ProfileRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IProfileRepository>(
  'ProfileRepository',
  ProfileRepository,
);

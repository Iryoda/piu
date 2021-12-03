import { container } from 'tsyringe';
import './providers';

import UserRepository from '../../modules/user/repositories/prisma/UserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import ProfileRepository from '@modules/user/repositories/prisma/ProfileRepository';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';

import ILikeRepository from '@modules/like/repositories/ILikeRepository';
import LikeRepository from '@modules/like/repositories/prisma/LikeRepository';

import IPostRepository from '@modules/post/repository/IPostRepository';
import PostRepository from '@modules/post/repository/prisma/PostRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IProfileRepository>(
  'ProfileRepository',
  ProfileRepository,
);

container.registerSingleton<ILikeRepository>('LikeRepository', LikeRepository);

container.registerSingleton<IPostRepository>('PostRepository', PostRepository);

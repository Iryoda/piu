import { User as PrismaUser } from '@prisma/client';
import Profile from './Profile';

export default interface User extends PrismaUser {
  profile?: Profile | null;
}

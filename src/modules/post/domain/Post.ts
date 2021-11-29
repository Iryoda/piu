import Comment from '@modules/comment/domain/Comment';
import User from '@modules/user/domain/User';
import { Post as PrismaPost } from '@prisma/client';

export default interface Post extends PrismaPost {
  user?: User;
  comments?: Comment[];
}

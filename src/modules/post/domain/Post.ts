import Comment from '@modules/comment/domain/Comment';
import { Post as PrismaPost } from '@prisma/client';

export default interface Post extends PrismaPost {
  comments: Comment[];
}

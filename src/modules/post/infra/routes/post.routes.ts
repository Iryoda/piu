import { Router } from 'express';
import CreatePostController from '../http/controllers/CreatePostController';

const postRouter = Router();

const createPostController = new CreatePostController();

postRouter.post('/', createPostController.handle);

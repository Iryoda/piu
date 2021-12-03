import { Router } from 'express';
import CreatePostController from '../http/controllers/CreatePostController';

const postRoutes = Router();

const createPostController = new CreatePostController();

postRoutes.post('/', createPostController.handle);

export default postRoutes;

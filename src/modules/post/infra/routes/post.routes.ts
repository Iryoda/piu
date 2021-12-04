import { Router } from 'express';
import CreatePostController from '../http/controllers/CreatePostController';
import FindAllController from '../http/controllers/FindAllController';

const postRoutes = Router();

const createPostController = new CreatePostController();
const findAllController = new FindAllController();

postRoutes.post('/', createPostController.handle);
postRoutes.get('/', findAllController.handle);

export default postRoutes;

import { Router } from 'express';
import CreatePostController from '../http/controllers/CreatePostController';
import DeletePostController from '../http/controllers/DeletePostController';
import FindAllController from '../http/controllers/FindAllController';

const postRoutes = Router();

const createPostController = new CreatePostController();
const findAllController = new FindAllController();
const deletePostController = new DeletePostController();

postRoutes.post('/', createPostController.handle);
postRoutes.get('/', findAllController.handle);
postRoutes.delete('/delete/:postId', deletePostController.handle);

export default postRoutes;

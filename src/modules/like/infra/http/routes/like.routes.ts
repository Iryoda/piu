import { Router } from 'express';
import LikeOnPostController from '../controllers/LikeOnPostController';

const likeRoutes = Router();
const likeOnPostController = new LikeOnPostController();

likeRoutes.post('/', likeOnPostController.handle);

export default likeRoutes;

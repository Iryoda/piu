import { Router } from 'express';
import CreateCommentOnPostController from '../controller/CreateCommentOnPostController';
import CreateResponseController from '../controller/CreateResponseController';

const commentRoutes = Router();

const createCommentOnPostController = new CreateCommentOnPostController();
const createResponseController = new CreateResponseController();

commentRoutes.post('/', createCommentOnPostController.handle);
commentRoutes.post('/response', createResponseController.handle);

export default commentRoutes;

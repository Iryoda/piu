import { Router } from 'express';
import CreateCommentOnPostController from '../controller/CreateCommentOnPostController';
import CreateResponseController from '../controller/CreateResponseController';
import DeleteCommentController from '../controller/DeleteCommentController';
import UpdateCommentController from '../controller/UpdateCommentController';

const commentRoutes = Router();

const createCommentOnPostController = new CreateCommentOnPostController();
const deleteCommentController = new DeleteCommentController();
const createResponseController = new CreateResponseController();
const updateCommentController = new UpdateCommentController();

commentRoutes.post('/:postid', createCommentOnPostController.handle);
commentRoutes.post('/on/:commentId', createResponseController.handle);

commentRoutes.delete('/delete/:commentId', deleteCommentController.handle);
commentRoutes.patch('/update/:commentId', updateCommentController.handle);

export default commentRoutes;

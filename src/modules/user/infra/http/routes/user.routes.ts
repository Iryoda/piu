import express from 'express';
import CreateUserController from '../controller/CreateUserController';
import DeleteUserController from '../controller/DeleteUserController';
import FindUserController from '../controller/FindUserController';
import UpdateProfileController from '../controller/UpdateProfileController';
import UpdateUserController from '../controller/UpdateUserController';

const userRoutes = express.Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const updateProfileController = new UpdateProfileController();

userRoutes.get('/', findUserController.findAll);
userRoutes.get('/:id', findUserController.findById);
userRoutes.post('/', createUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);
userRoutes.patch('/:id', updateUserController.handle);

//Profile
userRoutes.patch('/profile/:userId', updateProfileController.handle);

export default userRoutes;

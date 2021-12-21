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
userRoutes.get('/:userId', findUserController.findById);
userRoutes.post('/', createUserController.handle);
userRoutes.delete('/:userId', deleteUserController.handle);
userRoutes.patch('/:userId', updateUserController.handle);

//Profile
userRoutes.patch('/profile/:userId', updateProfileController.handle);

export default userRoutes;

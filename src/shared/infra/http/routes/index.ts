import userRoutes from '@modules/user/infra/http/routes/user.routes';
import express from 'express';

const appRoutes = express.Router();

appRoutes.use('/user', userRoutes);

export default appRoutes;

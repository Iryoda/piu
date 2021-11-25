import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import appRoutes from './routes';
import '@shared/container';
import Error from '@shared/errors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (_: Request, res: Response) => {
  res.status(200).json({ msg: 'Success' });
});

app.use(appRoutes);

//Global Error Handler
app.use((err: Error, _req: Request, response: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err}`,
  });
});

app.listen('3333', () => {
  console.log('SERVER ON');
});

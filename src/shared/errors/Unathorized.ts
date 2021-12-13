import AppError from '.';

export default class Unathorized extends AppError {
  constructor(param: string) {
    super(`This user doesn't have acess to ${param}`, 403);
  }
}

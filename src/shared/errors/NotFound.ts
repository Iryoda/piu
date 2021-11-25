import AppError from '.';

export default class NotFound extends AppError {
  constructor(param: string) {
    super(`${param} not found`, 400);
  }
}

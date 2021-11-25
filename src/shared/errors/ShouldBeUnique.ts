import AppError from '.';

export default class ShouldBeUnique extends AppError {
  constructor(param: string) {
    super(`${param} is already registered`, 400);
  }
}

import AppError from '.';

export default class MissingParam extends AppError {
  constructor(param: string) {
    super(`Missing Param ${param}`, 400);
  }
}

import AppError from '.';

class InvalidParam extends AppError {
  constructor(param: string) {
    super(`Invalid Param ${param}`, 400);
  }
}

export default InvalidParam;

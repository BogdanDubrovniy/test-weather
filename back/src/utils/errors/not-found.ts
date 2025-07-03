import { CustomError } from './custom-error';
import { NOT_FOUND_CODE } from '../../constants';

export class NotFoundError extends CustomError {
  constructor(message: string, details?: object) {
    super(message, NOT_FOUND_CODE, details);
  }
}

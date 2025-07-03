import { CustomError } from './custom-error';
import { FORBIDDEN_CODE } from '../../constants';

export class ForbiddenError extends CustomError {
  constructor(message: string, details?: object) {
    super(message, FORBIDDEN_CODE, details);
  }
}

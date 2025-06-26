import { CustomError } from './custom-error';
import { UNAUTHORIZED_CODE } from '../../constants';

export class UnauthorizedError extends CustomError {
    constructor(message: string, details?: object) {
        super(message, UNAUTHORIZED_CODE, details);
    }
}

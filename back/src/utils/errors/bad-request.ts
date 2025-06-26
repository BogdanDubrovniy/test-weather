import { CustomError } from './custom-error';
import { BAD_REQUEST_CODE } from '../../constants';

export class BadRequestError extends CustomError {
    constructor(message: string, details?: object) {
        super(message, BAD_REQUEST_CODE, details);
    }
}

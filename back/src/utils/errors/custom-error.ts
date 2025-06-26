export class CustomError extends Error {
    name: string;
    code: number;
    details?: object;

    constructor(message: string, statusCode: number, details?: object) {
        super(message);

        this.name = message;
        this.code = statusCode;
        this.details = details;
    }
}

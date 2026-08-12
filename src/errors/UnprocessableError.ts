import { BaseError } from "./BaseError";

export class UnprocessableError extends BaseError {
    constructor(
        message: string = "Valid parameters, but semantically incorrect"
    ) {
        super(422, message)
    }
}
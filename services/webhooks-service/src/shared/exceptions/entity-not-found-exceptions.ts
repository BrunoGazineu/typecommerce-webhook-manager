import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotFoundException extends HttpException {
    constructor(message: string) {
        super({message: [message]}, HttpStatus.NOT_FOUND);
    }
}
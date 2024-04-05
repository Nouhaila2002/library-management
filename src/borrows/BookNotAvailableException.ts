import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotAvailableException extends HttpException {
  constructor() {
    super('Book is not available for borrowing', HttpStatus.BAD_REQUEST);
  }
}

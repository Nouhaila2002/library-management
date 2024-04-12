import { Controller, Post, Body, Param, Query , Get, BadRequestException, Logger, Put} from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { Borrow } from '../borrow.entity';


@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post(':userId/:bookId')
  borrowBook(@Param('userId') userId: number, @Param('bookId') bookId: number): Promise<Borrow> {
    Logger.warn('warning');
    return this.borrowsService.borrowBook(userId, bookId);
  }

  @Put('return/:borrowId')
  async returnBook(@Param('borrowId') borrowId: string): Promise<void>{
     this.borrowsService.returnBook(borrowId);
  }

  
  @Get(':id/borrows')
  async getBorrowsByUser(@Param('id') userId: string): Promise<Borrow[]>{
    
    return this.borrowsService.findBorrowsByUser(parseInt(userId));
  }

}

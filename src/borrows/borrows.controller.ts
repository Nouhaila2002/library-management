import { Controller, Post, Body, Param, Query , Get} from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { Borrow } from '../borrow.entity';
import { Book } from '../book.entity';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post(':userId/:bookId')
  borrowBook(@Param('userId') userId: number, @Param('bookId') bookId: number): Promise<Borrow> {
    return this.borrowsService.borrowBook(userId, bookId);
  }

  @Post(':id/return/:borrowId')
  async returnBook(@Param('borrowId') borrowId: string): Promise<void> {
    await this.borrowsService.returnBook(+borrowId);
  }

  
  @Get(':id/borrows')
  async getBorrowsByUser(@Param('id') userId: string): Promise<Borrow[]> {
    return this.borrowsService.findBorrowsByUser(+userId);
  }

}

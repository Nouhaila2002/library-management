import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { Borrow } from '../borrow.entity';
import { User } from '../user.entity';
import { Book } from '../book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, User, Book])],
  controllers: [BorrowsController],
  providers: [BorrowsService],
  exports: [BorrowsService],
})
export class BorrowsModule {}

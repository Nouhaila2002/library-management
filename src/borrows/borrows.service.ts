// src/borrows/borrows.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from '../borrow.entity';
import { User } from '../user.entity';
import { Book } from '../book.entity';


@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowRepository: Repository<Borrow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async borrowBook(userId: number, bookId: number): Promise<Borrow> {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookRepository.findOne({ where: { id: Number(bookId) } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (!book.isAvailable) {
      throw new Error('Book is not available for borrowing');
    }

    book.isAvailable = false;
    await this.bookRepository.save(book);

    const borrow = new Borrow();
    borrow.user = user;
    borrow.book = book;
    borrow.borrowDate = new Date();
    borrow.returnDate = null;

    return this.borrowRepository.save(borrow);
  }

  async returnBook(borrowId: number): Promise<void> {
    const borrow = await this.borrowRepository.findOne({ where: { id: Number(borrowId) } });
    if (!borrow) {
      throw new NotFoundException('Borrow not found');
    }

    borrow.returnDate = new Date();
    await this.borrowRepository.save(borrow);

    borrow.book.isAvailable = true;
    await this.bookRepository.save(borrow.book);
  }

  
  async findBorrowsByUser(userId: number): Promise<Borrow[]> {
    return this.borrowRepository.find({ where: { user: { id: userId } } });
  }

}

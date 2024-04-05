import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from '../borrow.entity';
import { User } from '../user.entity';
import { Book } from '../book.entity';
import { BookNotAvailableException } from './BookNotAvailableException';


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
      throw new BookNotAvailableException();//throw new Error('Book is not available for borrowing');
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

  async returnBook(borrowId: number): Promise<Borrow> {
    const borrow = await this.borrowRepository.findOne({ where: { id: Number(borrowId) } , relations: ['book']});
    console.log(borrow.book)
    if (!borrow) {
      throw new NotFoundException('Borrow not found');
    }

    borrow.returnDate = new Date();
    await this.borrowRepository.save(borrow);

    borrow.book.isAvailable = true;
    await this.bookRepository.save(borrow.book);

    return this.borrowRepository.save(borrow);
  }

  
  async findBorrowsByUser(userId: number): Promise<Borrow[]> {
  //  const allBorrows = await this.borrowRepository.find({ relations: ['user'] });   
   // const userBorrows = allBorrows.filter(borrow => borrow.user.id === userId);

    
   /* return await this.borrowRepository.find({ 
      where: { user: { id: userId } },
      relations: ['user', 'book'] 
    }); //this.borrowRepository.find({ where: { user: { id: userId } } , relations: ['user']});*/
    return this.borrowRepository.find({ where: { user: { id: userId } } });
  }

}

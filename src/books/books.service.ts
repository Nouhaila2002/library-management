import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id: Number(id) } });
  }

  async create(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOne({ where: { id: Number(id) } });
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async searchBooks(query: string): Promise<Book[]> {
    return this.bookRepository.createQueryBuilder('book')
      .where('book.title LIKE :query OR book.author LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async searchBookTitle(title: string): Promise<Book | undefined> {
    return await this.bookRepository.findOne({ where: { title : title } });
  }

  async searchBooksAuthor(author: string): Promise<Book[] | undefined> {
    return await this.bookRepository.find({ where: { author : author } });
  }

}

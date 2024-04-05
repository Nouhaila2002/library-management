import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Post()
  create(@Body() book: Book): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }

  @Get('search')
  async searchBooks(@Query('q') query: string): Promise<Book[]> {
    console.log(query)
    return this.booksService.searchBooks(query);
  }

  @Get('search/title/:title')
  async searchBookTitle(@Param('title') title: string): Promise<Book> {
    return this.booksService.searchBookTitle(title);
  }

  @Get('search/author/:author')
  async searchBooksAuthor(@Param('author') author: string): Promise<Book[]> {
    return this.booksService.searchBooksAuthor(author);
  }

}

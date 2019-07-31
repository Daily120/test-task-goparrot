import { Controller, Get, Param, UsePipes, Post, Body, ValidationPipe, Delete, HttpCode, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { ObjectID } from '../../node_modules/typeorm';
import { IdValidationPipe } from '../shared/pipes/id-validation.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';

@Controller()
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooksByAuthor(
    @Param('authorId', IdValidationPipe) authorId: ObjectID,
  ) {
    return this.booksService.getAllBooksByAuthor(authorId);
  }

  @Get('/:bookId')
  @UsePipes(IdValidationPipe)
  getBookById(
    @Param('authorId') authorId: ObjectID,
    @Param('bookId') bookId: ObjectID,
  ) {
    return this.booksService.getBookById(authorId, bookId);
  }

  @Post()
  createBook(
    @Param('authorId', IdValidationPipe) authorId: ObjectID,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.createBook(authorId, createBookDto);
  }

  @Put('/:bookId')
  updateBook(
    @Param('authorId', IdValidationPipe) autorId: ObjectID,
    @Param('bookId', IdValidationPipe) bookId: ObjectID,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ) {
    return this.booksService.updateBook(autorId, bookId, createBookDto);
  }

  @Delete('/:bookId')
  @UsePipes(IdValidationPipe)
  @HttpCode(204)
  deleteBook(
    @Param('authorId') authorId: ObjectID,
    @Param('bookId') bookId: ObjectID,
  ): Promise<void> {
    return this.booksService.deleteBook(authorId, bookId);
  }
}

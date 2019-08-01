import {
  Controller,
  Get,
  Param,
  UsePipes,
  Post,
  Body,
  ValidationPipe,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IdValidationPipe } from '../shared/pipes/id-validation.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';

@Controller('api/authors/:authorId/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooksByAuthor(
    @Param('authorId', IdValidationPipe) authorId: string,
  ): Promise<Book[]> {
    return this.booksService.getAllBooksByAuthor(authorId);
  }

  @Get('/:bookId')
  @UsePipes(IdValidationPipe)
  getBookById(
    @Param('authorId') authorId: string,
    @Param('bookId') bookId: string,
  ): Promise<Book> {
    return this.booksService.getBookById(authorId, bookId);
  }

  @Post()
  createBook(
    @Param('authorId', IdValidationPipe) authorId: string,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.createBook(authorId, createBookDto);
  }

  @Put('/:bookId')
  updateBook(
    @Param('authorId', IdValidationPipe) autorId: string,
    @Param('bookId', IdValidationPipe) bookId: string,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ): Promise<string> {
    return this.booksService.updateBook(autorId, bookId, createBookDto);
  }

  @Delete('/:bookId')
  @UsePipes(IdValidationPipe)
  @HttpCode(204)
  deleteBook(
    @Param('authorId') authorId: string,
    @Param('bookId') bookId: string,
  ): Promise<void> {
    return this.booksService.deleteBook(authorId, bookId);
  }
}

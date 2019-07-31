import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { ObjectID } from '../../node_modules/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getAllBooksByAuthor(authorId: ObjectID): Promise<Book[]> {
    return await this.bookRepository.getAllBooksByAuthor(authorId);
  }

  async getBookById(authorId: ObjectID, bookId: ObjectID): Promise<Book> {
    return await this.bookRepository.getBookById(authorId, bookId);
  }

  async createBook(
    authorId: ObjectID,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    return await this.bookRepository.createBook(authorId, createBookDto);
  }

  async updateBook(
    authorId: ObjectID,
    bookId: ObjectID,
    createBookDto: CreateBookDto,
  ): Promise<string> {
    return await this.bookRepository.updateBook(
      authorId,
      bookId,
      createBookDto,
    );
  }

  async deleteBook(authorId: ObjectID, id: ObjectID): Promise<void> {
    return await this.bookRepository.deleteBook(authorId, id);
  }
}

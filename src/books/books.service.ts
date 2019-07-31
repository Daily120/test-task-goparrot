import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { ObjectID } from '../../node_modules/typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getAllBooksByAuthor(authorId: ObjectID) {
    return await this.bookRepository.getAllBooksByAuthor(authorId);
  }

  async getBookById(authorId: ObjectID, bookId: ObjectID) {
    return await this.bookRepository.getBookById(authorId, bookId);
  }

  async createBook(authorId: ObjectID, createBookDto: CreateBookDto) {
    return await this.bookRepository.createBook(authorId, createBookDto);
  }

  async updateBook(authorId: ObjectID, bookId: ObjectID, createBookDto: CreateBookDto) {
    return await this.bookRepository.updateBook(authorId, bookId, createBookDto);
  }

  async deleteBook(authorId: ObjectID, id: ObjectID): Promise<void> {
    return await this.bookRepository.deleteBook(authorId, id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { ObjectID } from 'typeorm';
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

  async getBookById(authorId: ObjectID, id: ObjectID): Promise<Book> {
    const found = await this.bookRepository.findOne(id);

    if (!found || found.author !== authorId) {
      throw new NotFoundException();
    }

    return found;
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
    const result = await this.bookRepository.delete(id);

    // doesn't work with typeorm&mongo
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

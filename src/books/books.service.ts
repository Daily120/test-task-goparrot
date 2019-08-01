import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getAllBooksByAuthor(authorId: string): Promise<Book[]> {
    return await this.bookRepository.getAllBooksByAuthor(authorId);
  }

  async getBookById(authorId: string, id: string): Promise<Book> {
    const found = await this.bookRepository.findOne(id);

    if (!found || found.author !== authorId) {
      throw new NotFoundException();
    }

    return found;
  }

  async createBook(
    authorId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    return await this.bookRepository.createBook(authorId, createBookDto);
  }

  async updateBook(
    authorId: string,
    bookId: string,
    createBookDto: CreateBookDto,
  ): Promise<string> {
    return await this.bookRepository.updateBook(
      authorId,
      bookId,
      createBookDto,
    );
  }

  async deleteBook(authorId: string, id: string): Promise<void> {
    const result = await this.bookRepository.delete(id);

    // doesn't work with typeorm&mongo
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

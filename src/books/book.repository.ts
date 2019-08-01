import {
  EntityRepository,
  Repository,
  getMongoManager,
} from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ConflictException, NotFoundException } from '../../node_modules/@nestjs/common';
import { Author } from '../authors/author.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(
    authorId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const manager = getMongoManager();
    const id = authorId;
    const found = await manager.findOne('author', id);

    if (!found) {
      throw new NotFoundException(`Author with ID "${authorId}" not found`);
    } else {
      const { title, iban, publishedAt } = createBookDto;

      const book = new Book();
      book.title = title;
      book.iban = iban;
      book.publishedAt = publishedAt;
      book.author = authorId;
      try {
        await book.save();
      } catch (e) {
        throw new ConflictException();
      }

      return book;
    }
  }

  async getAllBooksByAuthor(authorId: string): Promise<Book[]> {
    const books = await this.find({ author: authorId });

    return books;
  }

  async updateBook(
    authorId: string,
    id: string,
    createBookDto: CreateBookDto,
  ) {
    await this.update(id, {
      ...createBookDto,
      updatedAt: new Date().toISOString(),
    });

    return 'OK';
  }
}

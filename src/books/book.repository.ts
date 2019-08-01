import {
  EntityRepository,
  Repository,
} from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(
    authorId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const { title, iban, publishedAt } = createBookDto;

    const book = new Book();
    book.title = title;
    book.iban = iban;
    book.publishedAt = publishedAt;
    book.author = authorId;
    await book.save();

    return book;
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

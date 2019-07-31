import { EntityRepository, Repository, ObjectID } from '../../node_modules/typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { NotFoundException } from '../../node_modules/@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(authorId: ObjectID, createBookDto: CreateBookDto) {
    const { title, iban, publishedAt } = createBookDto;

    const book = new Book();
    book.title = title;
    book.iban = iban;
    book.publishedAt = publishedAt;
    book.author = authorId;
    await book.save();

    return book;
  }

  async getAllBooksByAuthor(authorId: ObjectID) {
    const books = await this.find({author: authorId});

    return books;
  }

  async getBookById(authorId: ObjectID, id: ObjectID) {
    const found = await this.findOne(id);

    if (!found || found.author !== authorId) {
      throw new NotFoundException();
    }

    return found;
  }

  async updateBook(authorId: ObjectID, id: ObjectID, createBookDto: CreateBookDto) {
    return await this.update(id, {
      ...createBookDto,
      author: authorId,
      updatedAt: new Date().toISOString(),
    });
  }

  async deleteBook(authorId: ObjectID, id: ObjectID): Promise<void> {
    const result = await this.delete(id);

    // doesn't work with typeorm&mongo
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

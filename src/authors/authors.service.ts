import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { UpdateResult, getMongoManager } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Book } from '../books/book.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.getAllAuthors();
  }

  async getAuthorById(id: string): Promise<Author> {
    const found = await this.authorRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Author with ID "${id}" not found`);
    }

    return found;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.authorRepository.createAuthor(createAuthorDto);
  }

  async updateAuthor(
    id: string,
    createAuthorDto: CreateAuthorDto,
  ): Promise<string> {
    return await this.authorRepository.updateAuthor(id, createAuthorDto);
  }

  async deleteAuthor(id: string): Promise<void> {
    const manager = getMongoManager();
    const author = await this.getAuthorById(id);

    if (!author) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    await this.authorRepository.remove(author);

    await manager.deleteMany(Book, { author: id});
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { ObjectID, UpdateResult } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.getAllAuthors();
  }

  async getAuthorById(id: ObjectID): Promise<Author> {
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
    id: ObjectID,
    createAuthorDto: CreateAuthorDto,
  ): Promise<string> {
    return await this.authorRepository.updateAuthor(id, createAuthorDto);
  }

  async deleteAuthor(id: ObjectID): Promise<void> {
    const result = await this.authorRepository.delete(id);

    // doesn't work with typeorm&mongo
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

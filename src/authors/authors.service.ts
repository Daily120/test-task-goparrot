import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { Author } from './author.entity';
import { ObjectID, UpdateResult } from '../../node_modules/typeorm';
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
    return this.authorRepository.getAuthorById(id);
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

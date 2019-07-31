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
    return await this.authorRepository.find();
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
  ): Promise<UpdateResult> {
    return await this.authorRepository.updateAuthor(id, createAuthorDto);
  }

  async deleteAuthor(id: ObjectID): Promise<void> {
    return this.authorRepository.deleteAuthor(id);
  }
}

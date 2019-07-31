import {
  Repository,
  EntityRepository,
  UpdateResult,
  ObjectID,
} from '../../node_modules/typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { NotFoundException } from '../../node_modules/@nestjs/common';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName, birthday } = createAuthorDto;

    const author = new Author();
    author.firstName = firstName;
    author.lastName = lastName;
    author.birthday = new Date(birthday);
    await author.save();

    return author;
  }

  async updateAuthor(
    id: ObjectID,
    createAuthorDto: CreateAuthorDto,
  ): Promise<string> {
    await this.update(id, {
      ...createAuthorDto,
      updatedAt: new Date().toISOString(),
    });

    return 'OK';
  }

  async deleteAuthor(id: ObjectID): Promise<void> {
    const result = await this.delete(id);

    // doesn't work with typeorm&mongo
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

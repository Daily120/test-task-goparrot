import {
  Repository,
  EntityRepository,
  UpdateResult,
} from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async getAllAuthors(): Promise<Author[]> {
    return await this.find();
  }

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
    id: string,
    createAuthorDto: CreateAuthorDto,
  ): Promise<string> {
    await this.update(id, {
      ...createAuthorDto,
      updatedAt: new Date().toISOString(),
    });

    return 'OK';
  }
}

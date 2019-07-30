import { Repository, EntityRepository } from '../../node_modules/typeorm';
import { Author } from './author.entity';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {}

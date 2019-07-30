import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}
}

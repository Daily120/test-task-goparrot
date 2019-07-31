import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '../node_modules/@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}

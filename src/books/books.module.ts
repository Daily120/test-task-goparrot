import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '../../node_modules/@nestjs/typeorm';
import { BookRepository } from './book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

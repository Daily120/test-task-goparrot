import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BooksModule } from './books/books.module';
import { RouterModule } from '../node_modules/nest-router';
import { routes } from './routes';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}

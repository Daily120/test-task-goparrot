import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { Routes } from 'nest-router';

export const routes: Routes = [
  {
    path: '/authors',
    module: AuthorsModule,
    children: [
      {
        path: '/:authorId/books',
        module: BooksModule,
      },
    ],
  },
];

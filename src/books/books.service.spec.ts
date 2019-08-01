import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BookRepository } from './book.repository';
import { NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';

const mockBookRepository = () => ({
  getAllBooksByAuthor: jest.fn(),
  getBookById: jest.fn(),
  createBook: jest.fn(),
  updateBook: jest.fn(),
  deleteBook: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('BooksService', () => {
  let booksService;
  let bookRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BookRepository, useFactory: mockBookRepository },
      ],
    }).compile();

    booksService = await module.get<BooksService>(BooksService);
    bookRepository = await module.get<BookRepository>(BookRepository);
  });

  describe('getAllBooksByAuthor', () => {
    it('gets all Books by Author from repository', async () => {
      bookRepository.getAllBooksByAuthor.mockResolvedValue('someValue');

      expect(bookRepository.getAllBooksByAuthor).not.toHaveBeenCalled();
      const result = await booksService.getAllBooksByAuthor();
      expect(bookRepository.getAllBooksByAuthor).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getBookById', () => {
    it('calls bookRepository.getBookById() and succesffuly retrieve and return the Book', async () => {
      const mockBook = {
        title: 'Test',
        iban: 546545656263665,
        author: 1,
        publishedAt: new Date().toISOString(),
      };
      bookRepository.findOne.mockResolvedValue(mockBook);

      const result = await booksService.getBookById(1, 1);
      expect(result).toEqual(mockBook);

      expect(bookRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as Book is not found', () => {
      bookRepository.findOne.mockResolvedValue(null);
      expect(booksService.getBookById(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBook', () => {
    it('calls bookRepository.createBook() and returns the result', async () => {
      bookRepository.createBook.mockResolvedValue('someBook');

      expect(bookRepository.createBook).not.toHaveBeenCalled();
      const createBookDto = {
        title: 'Test',
        iban: 546545656263665,
        publishedAt: new Date().toISOString(),
      };
      const result = await booksService.createBook(1, createBookDto);
      expect(bookRepository.createBook).toHaveBeenCalledWith(1, createBookDto);
      expect(result).toEqual('someBook');
    });
  });

  describe('deleteBook', () => {
    it('calls bookRepository.deleteBook() to delete an Book', async () => {
      bookRepository.delete.mockResolvedValue({ affected: 1 });
      expect(bookRepository.delete).not.toHaveBeenCalled();
      await booksService.deleteBook(1, 1);
      expect(bookRepository.delete).toHaveBeenCalledWith(1);
    });

    it('throws an error as Book could not be found', () => {
      bookRepository.delete.mockResolvedValue({ affected: 0 });
      expect(booksService.deleteBook(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateBook', () => {
    it('updates an Book', async () => {
      bookRepository.updateBook.mockResolvedValue('newBook');

      expect(bookRepository.updateBook).not.toHaveBeenCalled();
      const createBookDto = {
        title: 'Test',
        iban: 546545656263665,
        publishedAt: new Date().toISOString(),
      };
      const result = await booksService.updateBook(1, 1, createBookDto);
      expect(bookRepository.updateBook).toHaveBeenCalledWith(
        1,
        1,
        createBookDto,
      );
      expect(result).toEqual('newBook');
    });
  });
});

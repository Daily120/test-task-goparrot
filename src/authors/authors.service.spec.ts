import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from './author.repository';
import { NotFoundException } from '@nestjs/common';

const mockAuthorRepository = () => ({
  getAllAuthors: jest.fn(),
  createAuthor: jest.fn(),
  updateAuthor: jest.fn(),
  findOne: jest.fn(),
  deleteAuthor: jest.fn(),
  delete: jest.fn(),
});

describe('AuthorsService', () => {
  let authorsService;
  let authorRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: AuthorRepository, useFactory: mockAuthorRepository },
      ],
    }).compile();

    authorsService = await module.get<AuthorsService>(AuthorsService);
    authorRepository = await module.get<AuthorRepository>(AuthorRepository);
  });

  describe('getAllAuthors', () => {
    it('gets all authors from repository', async () => {
      authorRepository.getAllAuthors.mockResolvedValue('someValue');

      expect(authorRepository.getAllAuthors).not.toHaveBeenCalled();
      const result = await authorsService.getAllAuthors();
      expect(authorRepository.getAllAuthors).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getAuthorById', () => {
    it('calls authorRepository.findOne() and succesffuly retrieve and return the author', async () => {
      const mockAuthor = {
        firstName: 'Test',
        lastName: 'TestLast',
        birthday: new Date().toISOString(),
      };
      authorRepository.findOne.mockResolvedValue(mockAuthor);

      const result = await authorsService.getAuthorById(1);
      expect(result).toEqual(mockAuthor);

      expect(authorRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as author is not found', () => {
      authorRepository.findOne.mockResolvedValue(null);
      expect(authorsService.getAuthorById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createAuthor', () => {
    it('calls authorRepository.createAuthor() and returns the result', async () => {
      authorRepository.createAuthor.mockResolvedValue('someauthor');

      expect(authorRepository.createAuthor).not.toHaveBeenCalled();
      const createAuthorDto = {
        firstName: 'Test',
        lastName: 'TestLast',
        birthday: new Date().toISOString(),
      };
      const result = await authorsService.createAuthor(createAuthorDto);
      expect(authorRepository.createAuthor).toHaveBeenCalledWith(
        createAuthorDto,
      );
      expect(result).toEqual('someauthor');
    });
  });

  describe('deleteAuthor', () => {
    it('calls AuthorRepository.deleteAuthor() to delete an Author', async () => {
      authorRepository.delete.mockResolvedValue({ affected: 1 });
      expect(authorRepository.delete).not.toHaveBeenCalled();
      await authorsService.deleteAuthor(1);
      expect(authorRepository.delete).toHaveBeenCalledWith(1);
    });

    it('throws an error as Author could not be found', () => {
      authorRepository.delete.mockResolvedValue({ affected: 0 });
      expect(authorsService.deleteAuthor(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAuthor', () => {
    it('updates an author', async () => {
      authorRepository.updateAuthor.mockResolvedValue('newauthor');

      expect(authorRepository.updateAuthor).not.toHaveBeenCalled();
      const createAuthorDto = {
        firstName: 'Test',
        lastName: 'TestLast',
        birthday: new Date().toISOString(),
      };
      const result = await authorsService.updateAuthor(1, createAuthorDto);
      expect(authorRepository.updateAuthor).toHaveBeenCalledWith(
        1,
        createAuthorDto,
      );
      expect(result).toEqual('newauthor');
    });
  });
});

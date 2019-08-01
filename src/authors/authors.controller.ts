import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
import { UpdateResult } from 'typeorm';
import { IdValidationPipe } from '../shared/pipes/id-validation.pipe';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('api/authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  getAllAuthors(): Promise<Author[]> {
    return this.authorsService.getAllAuthors();
  }

  @Get('/:id')
  getAuthorById(@Param('id', IdValidationPipe) id: string): Promise<Author> {
    return this.authorsService.getAuthorById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Put('/:id')
  updateAuthor(
    @Param('id', IdValidationPipe) id: string,
    @Body(ValidationPipe) createAuthorDto: CreateAuthorDto,
  ): Promise<string> {
    return this.authorsService.updateAuthor(id, createAuthorDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteAuthor(@Param('id', IdValidationPipe) id: string): Promise<void> {
    return this.authorsService.deleteAuthor(id);
  }
}

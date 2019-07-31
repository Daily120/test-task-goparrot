import {
  IsNotEmpty,
  Length,
  IsNumberString,
  IsDateString,
} from '../../../node_modules/class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(16, 34, {
    message: 'IBAN contains from 16 to 34 digits',
  })
  iban: string;

  @IsDateString()
  publishedAt: Date;
}

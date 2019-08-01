import {
  IsNotEmpty,
  Length,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiModelProperty()
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(16, 34, {
    message: 'IBAN contains from 16 to 34 digits',
  })
  iban: string;

  @ApiModelProperty()
  @IsDateString()
  publishedAt: Date;
}

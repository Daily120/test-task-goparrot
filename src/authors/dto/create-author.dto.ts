import { IsNotEmpty, IsDateString, IsAlpha } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsDateString()
  birthday: Date;
}

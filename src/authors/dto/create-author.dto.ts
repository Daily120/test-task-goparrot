import { IsNotEmpty, IsDateString, IsAlpha } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @ApiModelProperty()
  @IsDateString()
  birthday: Date;
}

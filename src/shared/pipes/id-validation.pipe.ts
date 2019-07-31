import {
  PipeTransform,
  BadRequestException,
} from '../../../node_modules/@nestjs/common';
import { ObjectID } from 'mongodb';

export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!this.isIdValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid ID`);
    }

    return value;
  }

  private isIdValid(id: any) {
    return ObjectID.isValid(id);
  }
}

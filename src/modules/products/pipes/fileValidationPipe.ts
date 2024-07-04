import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: any) {
    if (!file) {
      throw new BadRequestException('You must provide a image file');
    }
    return file;
  }
}

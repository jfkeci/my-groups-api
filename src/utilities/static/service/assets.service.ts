import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AssetsService {
  /*   servePublic(filename: string): StreamableFile {
    try {
      filename = filename.replace('/', '').replace('\\', '');

      const file = createReadStream(
        join(`${process.cwd()}/images/public`, filename)
      );

      console.log(file);

      if (!file) {
        throw new NotFoundException('No file found');
      }

      return new StreamableFile(file);
    } catch (error) {
      console.log(error.message);

      if (error.message.includes('no such file or directory')) {
        throw new NotFoundException('No file found');
      }

      throw new InternalServerErrorException(error);
    }
  } */
}

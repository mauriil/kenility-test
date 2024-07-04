import { Injectable } from '@nestjs/common';
import { MyLogger } from './utils/MyLogger';

@Injectable()
export class AppService {
  constructor(private readonly myLogger: MyLogger) {}

  async getHello() {
    this.myLogger.log('Hello world!', 'AppService.getHello');
    return { message: 'Hello world!' };
  }
}

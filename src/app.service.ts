import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'не хуита!';
  }
  getHello1(): string {
    return 'Hello World1!';
  }
  getHello2(): string {
    return 'Hello World2!';
  }
}

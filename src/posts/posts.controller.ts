import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  domfdsf() {
    const a = 45;
    console.log(a);
    return 'sosamba';
  }
}

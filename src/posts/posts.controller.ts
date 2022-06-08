import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-port.dto';
import { UpdatePostDto } from './dto/update-port.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Put(':id')
  async replacePost(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(id, dto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}

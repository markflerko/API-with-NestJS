import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { FindOneParams } from 'src/utils/findOneParams';
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
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() dto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(dto, req.user);
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

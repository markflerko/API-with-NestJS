import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { PaginationParams } from 'src/types/paginationParams';
import Role from 'src/users/role.enum';
import RoleGuard from 'src/users/role.guard';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreatePostDto } from './dto/create-port.dto';
import { UpdatePostDto } from './dto/update-port.dto';
import { PostsService } from './posts.service';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(GET_POSTS_CACHE_KEY)
  @CacheTTL(120)
  @Get()
  async getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    // if (search) {
    //   return this.postsService.searchForPosts(search, offset, limit);
    // }
    return this.postsService.getAllPosts(offset, limit);
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
  @UseGuards(RoleGuard(Role.Admin))
  // @UseGuards(PermissionGuard(PostsPermission.DeletePost))
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}

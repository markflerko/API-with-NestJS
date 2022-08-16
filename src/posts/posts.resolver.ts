import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { CreatePostInput } from './inputs/post.input';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.getAllPosts();
    return posts.items;
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    // context.req.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://studio.apollographql.com',
    // );
    // context.req.res.setHeader('Access-Control-Allow-Credentials', 'true');
    return this.postsService.createPost(createPostInput, context.req.user);
  }
}

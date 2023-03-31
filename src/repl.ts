import { repl } from '@nestjs/core';
import { CreatePostDto } from 'src/posts/dto/create-port.dto';
import { PostsService } from 'src/posts/posts.service';
import { AppModule } from './app.module';
import User from './users/user.entity';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const replServer = await repl(AppModule);
  replServer.context.getUserByEmail = (userEmail: string) => {
    const usersService: UsersService = replServer.context.get(UsersService);
    return usersService.getByEmail(userEmail);
  };
  replServer.context.createPost = (post: CreatePostDto, user: User) => {
    const postsService: PostsService = replServer.context.get(PostsService);
    return postsService.createPost(post, user);
  };
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PostsModule, DatabaseModule, UsersModule, AuthenticationModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

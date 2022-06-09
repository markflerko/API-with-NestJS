import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [PostsModule, DatabaseModule, UsersModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

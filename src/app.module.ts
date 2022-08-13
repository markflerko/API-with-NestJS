import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { PostsModule } from './posts/posts.module';
import { PrivateFilesModule } from './private-files/private-files.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SubscribersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    CategoryModule,
    FilesModule,
    PrivateFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

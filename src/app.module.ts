import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { PostsModule } from './posts/posts.module';
import { PrivateFilesModule } from './private-files/private-files.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UsersModule } from './users/users.module';
import { EmailScheduleModule } from './email-schedule/email-schedule.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    CommentsModule,
    EmailModule,
    EmailScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

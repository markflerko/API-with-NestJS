import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import Post from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        ttl: 120,
      }),
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

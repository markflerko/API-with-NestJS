import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import DatabaseLogger from './databaseLogger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        logger: new DatabaseLogger(),
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pass123',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  providers: [DatabaseService],
  controllers: [DatabaseController],
})
export class DatabaseModule {}

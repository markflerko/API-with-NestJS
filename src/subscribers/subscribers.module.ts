import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import SubscribersController from './subscribers.controller';

@Module({
  imports: [ConfigModule],
  controllers: [SubscribersController],
  providers: [
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.SUBSCRIBERS_SERVICE_HOST,
            port: +process.env.SUBSCRIBERS_SERVICE_PORT,
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class SubscribersModule {}

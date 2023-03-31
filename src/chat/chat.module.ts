import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { ChatService } from './chat.service';
import Message from './message.entity';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([Message])],
  providers: [ChatService],
})
export class ChatModule {}

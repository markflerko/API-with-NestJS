import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CreateSubscriberDto from './dto/createSubscriber.dto';
import SubscribersService from './subscribers.service.interface';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export default class SubscribersController implements OnModuleInit {
  private subscribersService: SubscribersService;

  constructor(@Inject('SUBSCRIBERS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.subscribersService =
      this.client.getService<SubscribersService>('SubscribersService');
  }

  @Get()
  async getSubscribers() {
    return this.subscribersService.getAllSubscribers({});
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    return this.subscribersService.addSubscriber(subscriber);
  }
}

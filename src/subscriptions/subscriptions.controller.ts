import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import SubscriptionsService from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('monthly')
  @UseGuards(JwtAuthenticationGuard)
  async createMonthlySubscription(@Req() request: RequestWithUser) {
    return this.subscriptionsService.createMonthlySubscription(
      request.user.stripeCustomerId,
    );
  }

  @Get('monthly')
  @UseGuards(JwtAuthenticationGuard)
  async getMonthlySubscription(@Req() request: RequestWithUser) {
    return this.subscriptionsService.getMonthlySubscription(
      request.user.stripeCustomerId,
    );
  }
}

export default SubscriptionsController;

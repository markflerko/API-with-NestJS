import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  Req,
} from '@nestjs/common';
import StripeService from 'src/stripe/stripe.service';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';
import RequestWithRawBody from './requestWithRawBody.interface';

@Controller('webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.stripeService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    // if (
    //   event.type === 'customer.subscription.updated' ||
    //   event.type === 'customer.subscription.created'
    // ) {
    //   const data = event.data.object as Stripe.Subscription;

    //   const customerId: string = data.customer as string;
    //   const subscriptionStatus = data.status;

    //   await this.usersService.updateMonthlySubscriptionStatus(
    //     customerId,
    //     subscriptionStatus,
    //   );
    // }
  }
}

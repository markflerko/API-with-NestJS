import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import StripeEvent from './StripeEvent.entity';

@Injectable()
export class StripeWebhookService {
  constructor(
    @InjectRepository(StripeEvent)
    private eventsRepository: Repository<StripeEvent>,
    private readonly usersService: UsersService,
  ) {}

  createEvent(id: string) {
    return this.eventsRepository.insert({ id });
  }

  async processSubscriptionUpdate(event: Stripe.Event) {
    try {
      await this.createEvent(event.id);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('This event was already processed');
      }
    }

    const data = event.data.object as Stripe.Subscription;

    const customerId: string = data.customer as string;
    const subscriptionStatus = data.status;

    await this.usersService.updateMonthlySubscriptionStatus(
      customerId,
      subscriptionStatus,
    );
  }
}

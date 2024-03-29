import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';
import StripeError from './stripeError.enum';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }

  public async createSubscription(priceId: string, customerId: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        trial_period_days: 30,
      });
    } catch (error) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listSubscriptions(priceId: string, customerId: string) {
    return this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId,
      expand: ['data.latest_invoice', 'data.latest_invoice.payment_intent'],
    });
  }

  public async setDefaultCreditCard(
    paymentMethodId: string,
    customerId: string,
  ) {
    try {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } catch (error) {
      if (error?.type === StripeError.InvalidRequest) {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listCreditCards(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
  }

  public async attachCreditCard(paymentMethodId: string, customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: process.env.STRIPE_CURRENCY,
      off_session: true,
      confirm: true,
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }
}

export default StripeService;

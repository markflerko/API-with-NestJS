import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import StripeService from '../stripe/stripe.service';
import AddCreditCardDto from './dto/addCreditCardDto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async addCreditCard(
    @Body() creditCard: AddCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    return this.stripeService.attachCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getCreditCards(@Req() request: RequestWithUser) {
    return this.stripeService.listCreditCards(request.user.stripeCustomerId);
  }
}

export default CreditCardsController;

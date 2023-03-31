import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import StripeService from '../stripe/stripe.service';
import AddCreditCardDto from './dto/addCreditCardDto';
import SetDefaultCreditCardDto from './dto/setDefaultCreditCard.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('default')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async setDefaultCard(
    @Body() creditCard: SetDefaultCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    await this.stripeService.setDefaultCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }

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

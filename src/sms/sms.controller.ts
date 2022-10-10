import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import CheckVerificationCodeDto from './checkVerificationCode.dto';
import SmsService from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('check-verification-code')
  @UseGuards(JwtAuthenticationGuard)
  async checkVerificationCode(
    @Req() request: RequestWithUser,
    @Body() verificationData: CheckVerificationCodeDto,
  ) {
    if (request.user.isPhoneNumberConfirmed) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.smsService.confirmPhoneNumber(
      request.user.id,
      request.user.phoneNumber,
      verificationData.code,
    );
  }

  @Post('initiate-verification')
  @UseGuards(JwtAuthenticationGuard)
  async initiatePhoneNumberVerification(@Req() request: RequestWithUser) {
    if (request.user.isPhoneNumberConfirmed) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.smsService.initiatePhoneNumberVerification(
      request.user.phoneNumber,
    );
  }
}

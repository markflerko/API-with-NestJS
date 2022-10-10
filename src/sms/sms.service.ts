import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly usersService: UsersService) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendMessage(receiverPhoneNumber: string, message: string) {
    const senderPhoneNumber = process.env.TWILIO_SENDER_PHONE_NUMBER;

    return this.twilioClient.messages.create({
      body: message,
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }

  async confirmPhoneNumber(
    userId: number,
    phoneNumber: string,
    verificationCode: string,
  ) {
    const serviceSid = process.env.TWILIO_VERIFICATION_SERVICE_SID;

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: verificationCode });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }

    await this.usersService.markPhoneNumberAsConfirmed(userId);
  }

  initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid = process.env.TWILIO_VERIFICATION_SERVICE_SID;

    return this.twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms', locale: 'en' });
  }
}

export default SmsService;

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import EmailScheduleDto from './dto/email-schedule.dto';
import { EmailScheduleService } from './email-schedule.service';

@Controller('email-scheduling')
export class EmailScheduleController {
  constructor(private readonly emailScheduleService: EmailScheduleService) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailScheduleService.scheduleEmail(emailSchedule);
  }
}

export default EmailScheduleController;

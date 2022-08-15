import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailScheduleController } from './email-schedule.controller';
import { EmailScheduleService } from './email-schedule.service';

@Module({
  imports: [EmailModule],
  providers: [EmailScheduleService],
  controllers: [EmailScheduleController],
})
export class EmailScheduleModule {}

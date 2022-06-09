import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    UsersModule,
    // PassportModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}

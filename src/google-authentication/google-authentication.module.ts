import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthenticationController } from './google-authentication.controller';
import { GoogleAuthenticationService } from './google-authentication.service';

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService],
})
export class GoogleAuthenticationModule {}

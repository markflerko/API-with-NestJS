import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from './address.entity';
import User from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

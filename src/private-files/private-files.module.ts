import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PrivateFile from './private-file.entity';
import { PrivateFilesService } from './private-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateFile])],
  providers: [PrivateFilesService],
  exports: [PrivateFilesService],
})
export class PrivateFilesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { QueryRunner, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import PublicFile from './public-file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
  ) {}

  async deletePublicFileWithQueryRunner(
    fileId: number,
    queryRunner: QueryRunner,
  ) {
    const file = await queryRunner.manager.findOne(PublicFile, {
      where: { id: fileId },
    });

    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Key: file.key,
      })
      .promise();
    await queryRunner.manager.delete(PublicFile, fileId);
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({
      where: { id: fileId },
    });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }
}

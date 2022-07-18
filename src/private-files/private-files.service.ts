import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import PrivateFile from './private-file.entity';

@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
  ) {}

  public async generatePresignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
      Key: key,
    });
  }

  public async getPrivateFile(fileId: number) {
    const s3 = new S3();

    const fileInfo = await this.privateFilesRepository.findOne({
      where: { id: fileId },
      relations: ['owner'],
    });
    if (fileInfo) {
      const stream = await s3
        .getObject({
          Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
          Key: fileInfo.key,
        })
        .createReadStream();
      return {
        stream,
        info: fileInfo,
      };
    }
    throw new NotFoundException();
  }

  async uploadPrivateFile(
    dataBuffer: Buffer,
    ownerId: number,
    filename: string,
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.privateFilesRepository.create({
      key: uploadResult.Key,
      owner: {
        id: ownerId,
      },
    });
    await this.privateFilesRepository.save(newFile);
    return newFile;
  }
}

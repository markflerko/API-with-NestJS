import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';

async function bootstrap() {
  const PORT = +process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'log', 'error'],
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

  app.use(cookieParser());
  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: function (origin, callback) {
  //       return callback(null, true);
  //     },
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  await app.listen(PORT, () => {
    Logger.log(`Server is running on PORT: ${PORT}`);
  });
}
// runInCluster(bootstrap);
bootstrap();

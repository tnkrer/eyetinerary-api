import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

dotenv.config();
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Partner2Module } from './partner2.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(Partner2Module);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3334);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  app.use(cookieParser());

  app.enableCors({ credentials: true, origin: true });
  await app.listen(3000);
}
bootstrap();

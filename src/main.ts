import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(helmet());

  app.enableCors({
    origin: process.env.VUE_APP_URL
  });

  await app.listen(process.env.PORT ?? 13372);
}
bootstrap();

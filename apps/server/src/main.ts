import { NestFactory } from '@nestjs/core';
import { SystemLoggerService } from 'libs/system-logger/src';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new SystemLoggerService());
  await app.listen(3000);
}
bootstrap();

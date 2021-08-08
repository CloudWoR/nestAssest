import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('pacs接口服务端API')
    .setDescription('pacs接口服务端文档')
    .setVersion('1.0')
    .addTag('@珍木科技')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(1813);
  console.log('run as http://localhost:1813/api-doc');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
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
  await app.listen(3000);
  console.log('run as http://localhost:3000/api-doc');
}
bootstrap();

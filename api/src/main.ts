import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('DT Money API')
    .setDescription('API para gerenciamento de transações financeiras')
    .setVersion('1.0')
    .addTag('transactions', 'Endpoints relacionados a transações financeiras')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  // habilitar cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security middlewares
  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());

  // Serve static assets
  app.useStaticAssets(join(__dirname, '..', 'public/files'), {
    prefix: '/public/files/',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('JobDash')
    .setDescription('API documentation for JobDash')
    .setVersion('1.0')
    .addBearerAuth() // If you use JWT or Bearer token authentication
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at /api/docs
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(5000);
}

bootstrap();
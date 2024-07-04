import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyLogger } from './utils/MyLogger';
import { envs } from './config/envs';

async function bootstrap() {
  console.log("🚀 ~ envs:", envs)
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: envs.CORS_ORIGIN,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(compression());
  app.use(helmet());
  app.useLogger(app.get(MyLogger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sorpresitas eCommerce API Documentation')
    .setDescription('The Sorpresitas eCommerce API endpoints and examples.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads into DTO instances
    transformOptions: {
      enableImplicitConversion: true, // Allow implicit type conversion
    },
  }));
  await app.listen(3000);
}
bootstrap();
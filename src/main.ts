import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost'],
    credentials: true,
    allowedHeaders: ['x-timestamp', 'x-hash'],
  });

  const config = new DocumentBuilder()
    .setTitle('Jobs API')
    .setDescription('The channel communication between workers and clients')
    .setVersion('0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();

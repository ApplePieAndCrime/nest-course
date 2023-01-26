import { ValidationPipe } from './pipes/validation.pipe';
import { JwtAuthGuard } from './auth/jwt-auth.quard';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { join } from 'path';
import 'reflect-metadata';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // app.use(join(__dirname, '..', 'public'));

  const config = new DocumentBuilder()
    .setTitle('Урок по бэку')
    .setDescription('Документация REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'LOL',
    customCssUrl: '/public/css/index.css',
    customJs: '/public/swagger.js',
    customCss:
      'div.swagger-ui div.opblock-tag-section { backgroud-color: green; }',
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document, customOptions);
  // app.useGlobalGuards(new JwtAuthGuard())
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();

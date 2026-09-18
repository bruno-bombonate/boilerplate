import { NestFactory } from '@nestjs/core';
import { BoilerplateUserModule } from './boilerplate-user.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'custom-env';

async function bootstrap() {

  process.env.DOTENV_CONFIG_QUIET = 'true';
  env(process.env.APP_ENV, process.cwd());

  const app = await NestFactory.create(BoilerplateUserModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Boilerplate User API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_BOILERPLATE_USER_API_PORT!);

}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

//Main theme
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configServer = config.get('server');
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: configServer.origin });
    logger.log(`Accepting requests from origin "${configServer.origin}"`);
  }

  const port = process.env.PORT || configServer.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);

}

bootstrap();

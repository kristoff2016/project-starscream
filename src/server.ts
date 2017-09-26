import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as http from 'http';

import { ValidationPipe } from './common/validation';
import { customMessages } from './common/validation.messages';
import { customRules } from './common/validation.rules';
import { ApplicationModule } from './modules/app.module';

const instance = express();

instance.use(json());
instance.use(urlencoded({ extended: false }));

async function createApplication() {
  const app = await NestFactory.create(ApplicationModule, instance);

  app.useGlobalPipes(
    new ValidationPipe({
      customRules,
      customMessages
    })
  );

  return app;
}

export async function createServer() {
  const app = await createApplication();
  await app.init();

  return http.createServer(instance);
}

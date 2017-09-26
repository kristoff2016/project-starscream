import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as http from 'http';

import { ValidationPipe } from './common/validation';
import { customMessages } from './common/validation.messages';
import { customRules } from './common/validation.rules';
import { ApplicationModule } from './modules/app.module';

export async function createServer() {
  const instance = express();
  instance.use(json());
  instance.use(urlencoded({ extended: false }));

  const app = await NestFactory.create(ApplicationModule, instance);
  app.useGlobalPipes(new ValidationPipe({ customRules, customMessages }));

  await app.init();
  return http.createServer(instance);
}

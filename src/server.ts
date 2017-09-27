import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';

import { ValidationPipe } from './common';
import { ExceptionsHandler } from './common/exceptions-handler';
import { AuthGuard } from './common/guards/auth.guard';
import { customMessages } from './common/validation.messages';
import { customRules } from './common/validation.rules';
import { ApplicationModule } from './modules/app.module';

export async function createServer() {
  const instance = express();
  instance.use(morgan('dev'));
  instance.use(json());
  instance.use(urlencoded({ extended: false }));

  const app = await NestFactory.create(ApplicationModule, instance);
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe({ customRules, customMessages }));
  app.useGlobalFilters(new ExceptionsHandler());

  await app.init();
  return http.createServer(instance);
}

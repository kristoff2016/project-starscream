import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as PrettyError from 'pretty-error';

const pe = new PrettyError();

@Catch(HttpException, Error)
export class ExceptionsHandler implements ExceptionFilter {
  catch(err, res) {
    if (err instanceof HttpException) {
      console.error('HTTP', err);

      const status = err.getStatus();
      const response = err.getResponse();

      if (typeof response === 'string') {
        res.status(status).json({
          statusCode: status,
          message: response
        });
      } else {
        res.status(status).json({
          statusCode: status,
          ...response
        });
      }
    } else {
      const renderedError = pe.render(err);
      console.error('GENERAL', renderedError);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? JSON.stringify(err.stack) : undefined
      });
    }
  }
}

import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import * as PrettyError from 'pretty-error';

const pe = new PrettyError();

@Catch(Error)
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(err, res) {
    const renderedError = pe.render(err);
    console.error(renderedError);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
      stack: JSON.stringify(err.stack)
    });
  }
}

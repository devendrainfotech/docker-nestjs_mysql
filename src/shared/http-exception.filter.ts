import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// Global exception handler
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.log('HttpExceptionFilter -> exception', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    const errorObj =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message['error'];
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = errorObj.error;
    const message = errorObj.message;

    // send error exception to user
    response.status(status).json({
      statusCode: status,
      success: false,
      // error: error,
      message: message,
      data: [],
    });
  }
}

import { Response } from 'express';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { ErrorCode } from './enums/error-code';
import ErrorResponse from './responses/error.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @param exception
   * @param host
   */
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    let status: number = exception.getStatus();

    let responseBody: ErrorResponse;

    if (exception instanceof BadRequestException) {
      switch (exception.message) {
        case ErrorCode.E405002:
          responseBody = {
            code: ErrorCode.E405002,
          };
          break;
        default:
          responseBody = {
            code: ErrorCode.E400002,
          };
          break;
      }
    } else if (exception instanceof UnauthorizedException) {
      responseBody = {
        code: ErrorCode.E400007,
      };
    } else if (exception instanceof ForbiddenException) {
      responseBody = {
        code: ErrorCode.E400008,
      };
    } else if (exception instanceof NotFoundException) {
      responseBody = {
        code: ErrorCode.E400001,
      };
    } else if (exception instanceof ConflictException) {
      status = HttpStatus.BAD_REQUEST;
      responseBody = {
        code: ErrorCode.E405003,
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;

      switch (exception.message) {
        case ErrorCode.E500001:
          responseBody = {
            code: ErrorCode.E500001,
          };
          break;
        case ErrorCode.E500002:
          responseBody = {
            code: ErrorCode.E500002,
          };
          break;
        case ErrorCode.E500003:
          responseBody = {
            code: ErrorCode.E500003,
          };
          break;
        case ErrorCode.E500004:
          responseBody = {
            code: ErrorCode.E500004,
          };
          break;
        case ErrorCode.E500005:
          responseBody = {
            code: ErrorCode.E500005,
          };
          break;
        case ErrorCode.E500006:
          responseBody = {
            code: ErrorCode.E500006,
          };
          break;
        case ErrorCode.E500007:
          responseBody = {
            code: ErrorCode.E500007,
          };
          break;
        default:
          responseBody = {
            code: ErrorCode.E500007,
          };
          break;
      }
    }

    response.status(status).json(responseBody);
  }
}

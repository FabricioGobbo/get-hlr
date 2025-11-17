import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from './business.exception';
import { MappedsReturnsEnum } from '../enums/mapped-returns.enum';

/**
 * Filtro global de exceções
 * Padroniza as respostas de erro e previne exposição de stack traces em produção
 */
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const isProduction = process.env.NODE_ENV === 'production';

    // Trata BusinessException
    if (exception instanceof BusinessException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      this.logger.error(
        `[BusinessException] ${exception.code}: ${exception.message}`,
        exception.stack,
      );

      return response.status(status).json({
        statusCode: status,
        code: exception.code,
        message: exception.message,
        details: exception.details,
        timestamp: exceptionResponse.timestamp,
        path: request.url,
      });
    }

    // Trata HttpException padrão do NestJS
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      this.logger.error(
        `[HttpException] ${status}: ${exception.message}`,
        exception.stack,
      );

      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;

      return response.status(status).json({
        statusCode: status,
        code: MappedsReturnsEnum.ERRO_INTERNO,
        message: Array.isArray(message) ? message.join(', ') : message,
        timestamp: new Date().toISOString(),
        path: request.url,
        // Não expor detalhes em produção
        ...(isProduction ? {} : { details: exceptionResponse }),
      });
    }

    // Trata erros genéricos
    this.logger.error(
      '[UnhandledException] Erro não tratado',
      exception instanceof Error ? exception.stack : String(exception),
    );

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    return response.status(status).json({
      statusCode: status,
      code: MappedsReturnsEnum.ERRO_INESPERADO,
      message: isProduction
        ? 'Erro interno do servidor'
        : exception instanceof Error
          ? exception.message
          : 'Erro desconhecido',
      timestamp: new Date().toISOString(),
      path: request.url,
      // Não expor stack trace em produção
      ...(isProduction
        ? {}
        : {
            stack:
              exception instanceof Error ? exception.stack : String(exception),
          }),
    });
  }
}

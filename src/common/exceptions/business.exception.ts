import { HttpException, HttpStatus } from '@nestjs/common';
import { MappedsReturnsEnum } from '../enums/mapped-returns.enum';

/**
 * Exceção de negócio padronizada para o BFF
 * Segue o padrão definido no CLAUDE.md
 */
export class BusinessException extends HttpException {
  constructor(
    public readonly code: MappedsReturnsEnum,
    public readonly message: string,
    public readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly details?: unknown,
  ) {
    super(
      {
        code,
        message,
        details,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }

  /**
   * Factory methods para tipos comuns de erro
   */

  static validationError(
    message: string,
    details?: unknown,
  ): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.DADOS_INVALIDOS,
      message,
      HttpStatus.BAD_REQUEST,
      details,
    );
  }

  static notFound(message: string, details?: unknown): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.DADOS_NAO_ENCONTRADOS,
      message,
      HttpStatus.NOT_FOUND,
      details,
    );
  }

  static integrationError(
    message: string,
    details?: unknown,
  ): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.ERRO_INTEGRACAO,
      message,
      HttpStatus.BAD_GATEWAY,
      details,
    );
  }

  static serviceUnavailable(
    message: string,
    details?: unknown,
  ): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.SERVICO_INDISPONIVEL,
      message,
      HttpStatus.SERVICE_UNAVAILABLE,
      details,
    );
  }

  static timeout(message: string, details?: unknown): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.TIMEOUT_INTEGRACAO,
      message,
      HttpStatus.GATEWAY_TIMEOUT,
      details,
    );
  }

  static unauthorized(message: string, details?: unknown): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.NAO_AUTENTICADO,
      message,
      HttpStatus.UNAUTHORIZED,
      details,
    );
  }

  static forbidden(message: string, details?: unknown): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.SEM_PERMISSAO,
      message,
      HttpStatus.FORBIDDEN,
      details,
    );
  }

  static tooManyRequests(
    message: string,
    details?: unknown,
  ): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.MUITAS_REQUISICOES,
      message,
      HttpStatus.TOO_MANY_REQUESTS,
      details,
    );
  }

  static internalError(message: string, details?: unknown): BusinessException {
    return new BusinessException(
      MappedsReturnsEnum.ERRO_INTERNO,
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      details,
    );
  }
}

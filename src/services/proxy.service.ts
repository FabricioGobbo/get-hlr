import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { BusinessException } from '../common/exceptions/business.exception';
import { TokenManagerService } from './token-manager.service';

export interface ProxyOptions {
  url: string;
  body?: any;
  headers?: Record<string, string>;
  logPrefix: string;
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean; // KISS: Simple flag, default true
  throwOnHttpError?: boolean; // If false, returns error response instead of throwing (default: true)
}

/**
 * ProxyService - Single Responsibility: Forward requests to downstream services
 *
 * Responsibilities:
 * - Forward HTTP requests
 * - Inject authentication tokens
 * - Handle retries
 * - Log requests/responses
 *
 * NOT responsible for:
 * - Token acquisition (TokenManagerService)
 * - User authentication (AuthGuard)
 */
@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly sensitiveFields = [
    'password',
    'senha',
    'token',
    'authorization',
    'auth',
    'secret',
    'api_key',
    'apiKey',
    'cpf',
    'cnpj',
    'credit_card',
    'card_number',
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly tokenManager: TokenManagerService, // Dependency Inversion
  ) {}

  /**
   * POST request to downstream service
   * SOLID: Open/Closed - extend for new methods without modifying this
   * Type Safety: Generic return type for proper typing
   */
  async post<T = unknown>(options: ProxyOptions): Promise<T> {
    const {
      url,
      body,
      logPrefix,
      timeout = 30000,
      retries = 3,
      requiresAuth = true,
      throwOnHttpError = true,
    } = options;

    this.logger.log(`[${logPrefix}] Request to: ${url}`);
    this.logger.debug(`[${logPrefix}] Body: ${this.sanitizeForLog(body)}`);

    // DRY: Shared header building
    const headers = await this.buildHeaders(options.headers, requiresAuth);

    return this.executeWithRetry(
      async () => {
        const response = await firstValueFrom(
          this.httpService.post(url, body, {
            headers,
            timeout,
          }),
        );

        this.logger.log(`[${logPrefix}] Response status: ${response.status}`);
        this.logger.debug(
          `[${logPrefix}] Response data: ${this.sanitizeForLog(response.data)}`,
        );

        return response.data;
      },
      retries,
      logPrefix,
      throwOnHttpError,
    );
  }

  /**
   * GET request to downstream service
   * Type Safety: Generic return type for proper typing
   */
  async get<T = unknown>(options: ProxyOptions): Promise<T> {
    const {
      url,
      logPrefix,
      timeout = 30000,
      retries = 3,
      requiresAuth = true,
      throwOnHttpError = true,
    } = options;

    this.logger.log(`[${logPrefix}] Request to: ${url}`);
    this.logger.debug(`[${logPrefix}] Timeout: ${timeout}ms, Retries: ${retries}, RequiresAuth: ${requiresAuth}`);

    // DRY: Shared header building
    const headers = await this.buildHeaders(options.headers, requiresAuth);

    return this.executeWithRetry(
      async () => {
        const response = await firstValueFrom(
          this.httpService.get(url, {
            headers,
            timeout,
          }),
        );

        this.logger.log(`[${logPrefix}] Response status: ${response.status}`);
        this.logger.debug(
          `[${logPrefix}] Response data: ${this.sanitizeForLog(response.data)}`,
        );

        return response.data;
      },
      retries,
      logPrefix,
      throwOnHttpError,
    );
  }

  /**
   * Build headers with authentication token
   * PRIVATE: DRY - single place for header logic
   */
  private async buildHeaders(
    customHeaders: Record<string, string> | undefined,
    requiresAuth: boolean,
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (requiresAuth) {
      try {
        const token = await this.tokenManager.getValidToken();
        headers['token'] = token; // spec-conta expects 'token' header, not 'Authorization'
        this.logger.debug('Token injected into request');
      } catch (error) {
        this.logger.error('Failed to acquire token', error);
        throw BusinessException.unauthorized(
          'Cannot authenticate with downstream service',
        );
      }
    }

    return headers;
  }

  /**
   * Executa requisição com retry automático para erros temporários
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    retries: number,
    logPrefix: string,
    throwOnHttpError = true,
    attempt = 1,
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      const shouldRetry =
        this.isRetriableError(error) && attempt < retries;

      if (shouldRetry) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
        this.logger.warn(
          `[${logPrefix}] Tentativa ${attempt}/${retries} falhou. Retry em ${delay}ms`,
        );
        await this.sleep(delay);
        return this.executeWithRetry(fn, retries, logPrefix, throwOnHttpError, attempt + 1);
      }

      return this.handleError(error, logPrefix, throwOnHttpError);
    }
  }

  /**
   * Determina se o erro é temporário e pode ser retentado
   */
  private isRetriableError(error: unknown): boolean {
    if (this.isAxiosError(error)) {
      // Retry em erros de rede, timeout e 5xx (exceto 501)
      if (!error.response) return true; // Network error
      if (error.code === 'ECONNABORTED') return true; // Timeout
      const status = error.response.status;
      return status >= 500 && status !== 501;
    }
    return false;
  }

  /**
   * Trata erros e converte para BusinessException ou retorna resposta estruturada
   */
  private handleError(error: unknown, logPrefix: string, throwOnHttpError = true): never {
    if (this.isAxiosError(error)) {
      this.logger.error(
        `[${logPrefix}] Error: ${error.message}`,
        error.stack,
      );

      // Timeout - sempre lança exceção (não é erro HTTP esperado)
      if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        throw BusinessException.timeout(
          `Timeout ao comunicar com ${logPrefix}`,
          { url: error.config?.url, timeout: error.config?.timeout },
        );
      }

      // Erro de resposta da API
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        const requestUrl = error.config?.url || 'unknown';

        // Log detalhado para erros 4xx
        if (status >= 400 && status < 500) {
          this.logger.warn(
            `[${logPrefix}] HTTP ${status} Error - URL: ${requestUrl}`,
          );
          this.logger.debug(
            `[${logPrefix}] Response data: ${this.sanitizeForLog(data)}`,
          );
        }

        // Se throwOnHttpError = false, retorna a resposta estruturada da API
        // Isso permite que o caller trate o erro de forma específica
        if (!throwOnHttpError && data) {
          this.logger.debug(
            `[${logPrefix}] Returning error response without throwing (throwOnHttpError=false)`,
          );
          return data as never;
        }

        // 4xx - Erros do cliente
        if (status >= 400 && status < 500) {
          if (status === 401) {
            throw BusinessException.unauthorized(
              `Não autenticado na API ${logPrefix}`,
              { status, data, url: requestUrl },
            );
          }
          if (status === 403) {
            throw BusinessException.forbidden(
              `Sem permissão para acessar ${logPrefix}`,
              { status, data, url: requestUrl },
            );
          }
          if (status === 404) {
            throw BusinessException.notFound(
              `Recurso não encontrado em ${logPrefix}`,
              { status, data, url: requestUrl },
            );
          }
          if (status === 429) {
            throw BusinessException.tooManyRequests(
              `Muitas requisições para ${logPrefix}`,
              { status, data, url: requestUrl },
            );
          }
          throw BusinessException.validationError(
            (data as any)?.message || `Erro de validação na API ${logPrefix}`,
            { status, data, url: requestUrl },
          );
        }

        // 5xx - Erros do servidor
        if (status >= 500) {
          throw BusinessException.serviceUnavailable(
            `Serviço ${logPrefix} temporariamente indisponível`,
            { status, data },
          );
        }
      }

      // Erro de rede (sem resposta) - sempre lança exceção
      throw BusinessException.integrationError(
        `Erro de conexão com ${logPrefix}`,
        { message: error.message, code: error.code },
      );
    }

    // Erro genérico - sempre lança exceção
    if (error instanceof Error) {
      this.logger.error(
        `[${logPrefix}] Error: ${error.message}`,
        error.stack,
      );
    }

    throw BusinessException.internalError(
      `Erro ao comunicar com a API ${logPrefix}`,
      { error: error instanceof Error ? error.message : String(error) },
    );
  }

  /**
   * Remove dados sensíveis dos logs
   */
  private sanitizeForLog(data: unknown): string {
    if (!data) return String(data);

    try {
      const sanitized = this.deepSanitize(data);
      return JSON.stringify(sanitized);
    } catch (error) {
      return '[Log sanitization error]';
    }
  }

  /**
   * Sanitiza recursivamente objetos e arrays
   */
  private deepSanitize(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.deepSanitize(item));
    }

    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const lowerKey = key.toLowerCase();
        const isSensitive = this.sensitiveFields.some((field) =>
          lowerKey.includes(field.toLowerCase()),
        );

        if (isSensitive) {
          sanitized[key] = '***REDACTED***';
        } else if (typeof value === 'object') {
          sanitized[key] = this.deepSanitize(value);
        } else {
          sanitized[key] = value;
        }
      }
      return sanitized;
    }

    return obj;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private isAxiosError(error: unknown): error is AxiosError {
    return (
      error instanceof Error &&
      'isAxiosError' in error &&
      error.isAxiosError === true
    );
  }
}


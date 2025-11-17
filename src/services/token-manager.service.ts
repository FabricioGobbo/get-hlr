import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BusinessException } from '../common/exceptions/business.exception';

// KISS: Simple interface, no complex DTOs
interface TokenCache {
  token: string;
  expiresAt: number; // Unix timestamp in milliseconds
}

// BSS API response (based on actual Swagger documentation)
interface BssAuthResponse {
  sucesso: number; // 0 = success
  transacao: string; // Transaction ID
  resultado: string; // Result message (e.g., "login efetuado com sucesso")
  token: string; // JWT token
}

/**
 * TokenManagerService - Single Responsibility: Manage external API tokens
 *
 * Responsibilities:
 * - Acquire token from BSS on startup
 * - Cache token in memory
 * - Auto-refresh before expiration
 * - Provide valid token to consumers
 *
 * NOT responsible for:
 * - Request forwarding (ProxyService)
 * - User authentication (AuthGuard)
 * - Token storage in database (YAGNI)
 */
@Injectable()
export class TokenManagerService implements OnModuleInit {
  private readonly logger = new Logger(TokenManagerService.name);

  // KISS: Simple in-memory cache, no external dependencies
  private cache: TokenCache | null = null;

  // Prevent concurrent token acquisitions (race condition guard)
  private acquisitionPromise: Promise<string> | null = null;

  // Configuration (Dependency Inversion)
  private readonly bssAuthUrl: string;
  private readonly bssAuthEmail: string;
  private readonly bssAuthPassword: string;
  private readonly refreshBufferSeconds = 300; // 5 minutes before expiry

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // KISS: Direct config access, no complex config classes
    this.bssAuthUrl = this.configService.getOrThrow<string>('bssAuthUrl');
    this.bssAuthEmail = this.configService.getOrThrow<string>('bssAuthEmail');
    this.bssAuthPassword =
      this.configService.getOrThrow<string>('bssAuthPassword');
  }

  /**
   * Initialize token on module startup
   * SOLID: Interface Segregation - OnModuleInit provides startup hook
   */
  async onModuleInit(): Promise<void> {
    this.logger.log('Initializing TokenManagerService...');

    try {
      await this.acquireToken();
      this.logger.log('Initial token acquired successfully');

      // KISS: Simple interval for refresh, no complex schedulers
      this.schedulePeriodicRefresh();
    } catch (error) {
      this.logger.error('Failed to acquire initial token', error);
      // Don't throw - allow app to start, retry on first request
    }
  }

  /**
   * Get valid token - main public API
   * SOLID: Open/Closed - extend refresh logic without modifying this
   */
  async getValidToken(): Promise<string> {
    // Fast path: return cached token if valid
    if (this.cache && !this.isExpired()) {
      return this.cache.token;
    }

    // If acquisition in progress, wait for it (prevent race conditions)
    if (this.acquisitionPromise) {
      this.logger.debug('Token acquisition in progress, waiting...');
      return this.acquisitionPromise;
    }

    // Acquire new token
    this.logger.log('Token expired or missing, acquiring new token');
    return this.acquireToken();
  }

  /**
   * Acquire token from BSS
   * PRIVATE: Single Responsibility - only called internally
   */
  private async acquireToken(): Promise<string> {
    // Prevent concurrent acquisitions
    if (this.acquisitionPromise) {
      return this.acquisitionPromise;
    }

    this.acquisitionPromise = this.performAcquisition();

    try {
      const token = await this.acquisitionPromise;
      return token;
    } finally {
      this.acquisitionPromise = null;
    }
  }

  /**
   * Perform actual HTTP call to BSS
   * PRIVATE: Separated for clarity and testing
   */
  private async performAcquisition(): Promise<string> {
    this.logger.log('Requesting token from BSS...');

    try {
      // Prepare form data (API expects application/x-www-form-urlencoded)
      const params = new URLSearchParams();
      params.append('email', this.bssAuthEmail);
      params.append('senha', this.bssAuthPassword); // Note: API expects 'senha' not 'password'

      const response = await firstValueFrom(
        this.httpService.post<BssAuthResponse>(
          this.bssAuthUrl,
          params.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            timeout: 10000,
          },
        ),
      );

      const { sucesso, token, resultado, transacao } = response.data;

      if (sucesso !== 0 || !token) {
        this.logger.error(
          `BSS authentication failed: sucesso=${sucesso}, resultado=${resultado}`,
        );
        throw new Error(
          `Authentication failed: ${resultado || 'Invalid BSS response'}`,
        );
      }

      // KISS: Default token expiration to 24 hours since API doesn't provide expiresIn
      // This is safe because we refresh every hour and 5 minutes before expiry
      const expiresIn = 86400; // 24 hours in seconds
      const expiresAt = Date.now() + expiresIn * 1000;

      this.cache = { token, expiresAt };

      this.logger.log(
        `Token acquired successfully. Transaction: ${transacao}. Expires: ${new Date(expiresAt).toISOString()}`,
      );

      return token;
    } catch (error) {
      this.logger.error('Token acquisition failed', error);
      this.cache = null; // Clear cache on error

      if (error.response) {
        throw BusinessException.unauthorized('BSS authentication failed', {
          status: error.response.status,
        });
      }

      throw BusinessException.integrationError(
        'Cannot connect to BSS authentication service',
        { error: error.message },
      );
    }
  }

  /**
   * Check if token is expired
   * PRIVATE: Simple comparison with buffer
   */
  private isExpired(): boolean {
    if (!this.cache) return true;

    const now = Date.now();
    const bufferMs = this.refreshBufferSeconds * 1000;
    const expiryWithBuffer = this.cache.expiresAt - bufferMs;

    return now >= expiryWithBuffer;
  }

  /**
   * Schedule periodic token refresh
   * PRIVATE: YAGNI - simple setInterval, no complex scheduling
   */
  private schedulePeriodicRefresh(): void {
    setInterval(async () => {
      try {
        if (this.isExpired()) {
          await this.getValidToken();
        }
      } catch (error) {
        this.logger.error('Scheduled token refresh failed', error);
      }
    }, 3600000); // Every hour - KISS: simple fixed interval
  }

  /**
   * Get token status for health checks
   * PUBLIC: Useful for monitoring, but keep it simple
   */
  getTokenStatus(): { hasToken: boolean; expiresAt?: string; ttl?: number } {
    if (!this.cache) {
      return { hasToken: false };
    }

    const ttl = Math.floor((this.cache.expiresAt - Date.now()) / 1000);

    return {
      hasToken: true,
      expiresAt: new Date(this.cache.expiresAt).toISOString(),
      ttl, // seconds until expiry
    };
  }

  /**
   * Force token refresh (for manual testing/debugging)
   * PUBLIC: Useful but not part of normal flow
   */
  async forceRefresh(): Promise<void> {
    this.logger.log('Forcing token refresh...');
    this.cache = null;
    this.acquisitionPromise = null;
    await this.getValidToken();
  }
}

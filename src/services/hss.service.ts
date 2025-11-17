import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from './proxy.service';
import { ContaService } from './conta.service';
import { BusinessException } from '../common/exceptions/business.exception';
import { extractMsisdnFromConta } from '../common/utils';

/**
 * HssService - Service for handling HSS API calls
 *
 * Single Responsibility: HSS API interactions with MSISDN resolution
 * Separation of Concerns: Business logic moved from controller
 * Type Safety: Properly typed methods
 */
@Injectable()
export class HssService {
  private readonly logger = new Logger(HssService.name);
  private readonly hssUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
    private readonly contaService: ContaService,
  ) {
    this.hssUrl = this.configService.getOrThrow<string>('hssUrl');
  }

  /**
   * Query network subscriber by identifier
   *
   * Accepts IMSI, ICCID or MSISDN
   * Flow:
   * 1. Resolve identifier to account data
   * 2. Extract MSISDN from account
   * 3. Call HSS API with MSISDN
   *
   * @param identifier - IMSI, ICCID or MSISDN
   * @returns HSS API response
   */
  async queryNetworkSubscriber(identifier: string): Promise<unknown> {
    this.logger.log(`Querying network subscriber for identifier: ${identifier}`);

    // Step 1: Get account details to resolve MSISDN
    const contaResponse = await this.contaService.getDetalhes(identifier);

    // Step 2: Extract MSISDN
    const msisdn = extractMsisdnFromConta(contaResponse);

    if (!msisdn) {
      this.logger.error(`MSISDN not found for identifier: ${identifier}`);
      throw BusinessException.notFound(
        `MSISDN não encontrado para o identificador ${identifier}`,
      );
    }

    this.logger.log(`MSISDN resolved: ${msisdn}, calling HSS...`);

    // Step 3: Call HSS with MSISDN
    const url = `${this.hssUrl}/network-subscriber`;
    const requestBody = {
      dados: { imsi: msisdn },
    };

    return this.proxyService.post({
      url,
      body: requestBody,
      logPrefix: 'HSS',
      requiresAuth: true,
    });
  }
}
